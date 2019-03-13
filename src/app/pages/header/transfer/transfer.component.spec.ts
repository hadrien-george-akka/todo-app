import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatButtonModule,
          MatFormFieldModule,
          MatMenuModule,
          MatSnackBarModule,
          MatDialogRef,
          MatInputModule,
          MatSnackBar,
          MatDialog,
          MatDialogModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TransferComponent } from './transfer.component';
import { HeaderComponent } from '../header.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { Todo, ApplicationState } from 'src/app/model/model.interface';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  // let dialogRef = {};
  const mockDialogRef = {
    close: () => { }
  };
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let localStorageData = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in localStorageData ? localStorageData[key] : null;
    },
    setItem: (key: string, value: string) => {
      localStorageData[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete localStorageData[key];
    },
    clear: () => {
      localStorageData = {};
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TransferComponent,
        ColorPickerComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatMenuModule,
        MatInputModule,
        MatSnackBarModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    spyOn(component.dialogRef, 'close')
      .and.callFake(mockDialogRef.close);

  });

  beforeEach(inject([MatSnackBar, OverlayContainer],
    (sb: MatSnackBar, oc: OverlayContainer) => {
    snackBar = sb;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a ApplicationState object to JSON format', () => {
    localStorage.setItem('todos', JSON.stringify(testTodos));
    localStorage.setItem('colorTheme', 'greenlight');

    const json = JSON.parse(component.generateJson());

    expect(json.todos).toEqual(testTodos);
    expect(json.colorTheme).toEqual('greenlight');
  });

  it('should copy text and display snackbar message', () => {
    const spyOnThing = spyOn(document, 'execCommand');
    const htmlElement = fixture.debugElement.query(By.css('#export-textarea')).nativeElement;

    component.copyExportText(htmlElement);
    expect(spyOnThing).toHaveBeenCalledWith('copy');

    const containerElement = overlayContainerElement.querySelector('simple-snack-bar');
    expect(containerElement.textContent).toContain('Copied text');
  });

  it('should isJsonValid function return boolean value if json string is valid', () => {
    let str = 'invalid';
    expect(component.isJsonValid(str)).toBe(false);
    str = '"valid"';
    expect(component.isJsonValid(str)).toBe(true);
  });

  it('should isTodosValid function return boolean if list of todos dont contain all todo values', () => {
    expect(component.isTodosValid(todosWithoutId)).toBe(false);
    expect(component.isTodosValid(todosWithoutTitle)).toBe(false);
    expect(component.isTodosValid(todosWithoutIsComplete)).toBe(false);
    expect(component.isTodosValid(testTodos)).toBe(true);
  });

  it('should isColorThemeValid function return boolean if color theme value does not exist', () => {
    expect(component.isColorThemeValid('redlight')).toBe(true);
    expect(component.isColorThemeValid('yellow')).toBe(true);
    expect(component.isColorThemeValid('greenlight')).toBe(true);
    expect(component.isColorThemeValid('cyanlight')).toBe(true);
    expect(component.isColorThemeValid('bluelight')).toBe(true);
    expect(component.isColorThemeValid('purplelight')).toBe(true);
    expect(component.isColorThemeValid('grey')).toBe(true);
    expect(component.isColorThemeValid('reddark')).toBe(true);
    expect(component.isColorThemeValid('orange')).toBe(true);
    expect(component.isColorThemeValid('greendark')).toBe(true);
    expect(component.isColorThemeValid('cyandark')).toBe(true);
    expect(component.isColorThemeValid('bluedark')).toBe(true);
    expect(component.isColorThemeValid('purpledark')).toBe(true);
    expect(component.isColorThemeValid('black')).toBe(true);

    expect(component.isColorThemeValid('invalid')).toBe(false);
  });

  it('should isApplicationStateValid function return boolean if application state object is not valid', () => {
    const testApplicationState: ApplicationState = {
      todos: testTodos,
      colorTheme: 'greenlight'
    };
    expect(component.isApplicationStateValid(testApplicationState)).toBe(true);
    testApplicationState.todos = todosWithoutId;
    expect(component.isApplicationStateValid(testApplicationState)).toBe(false);
    testApplicationState.todos = todosWithoutTitle;
    expect(component.isApplicationStateValid(testApplicationState)).toBe(false);
    testApplicationState.todos = todosWithoutIsComplete;
    expect(component.isApplicationStateValid(testApplicationState)).toBe(false);
  });

  it('should set errors when json, todos or colorTheme string from import text-area are invalid', () => {
    const testApplicationState: ApplicationState = {
      todos: testTodos,
      colorTheme: 'greenlight'
    };

    component.transferFormGroup.get('importCtrl').setValue(JSON.stringify(testApplicationState));
    component.checkImportValidity();
    expect(component.transferFormGroup.get('importCtrl').valid).toBe(true);

    component.transferFormGroup.get('importCtrl').setValue('abc');
    component.checkImportValidity();
    expect(component.transferFormGroup.get('importCtrl').valid).toBe(false);
    expect(component.transferFormGroup.get('importCtrl').hasError('jsonError')).toBe(true);

    testApplicationState.todos = todosWithoutId;
    component.transferFormGroup.get('importCtrl').setValue(JSON.stringify(testApplicationState));
    component.checkImportValidity();
    expect(component.transferFormGroup.get('importCtrl').valid).toBe(false);
    expect(component.transferFormGroup.get('importCtrl').hasError('todosError')).toBe(true);

    testApplicationState.todos = testTodos;
    testApplicationState.colorTheme = 'invalid';
    component.transferFormGroup.get('importCtrl').setValue(JSON.stringify(testApplicationState));
    component.checkImportValidity();
    expect(component.transferFormGroup.get('importCtrl').valid).toBe(false);
    expect(component.transferFormGroup.get('importCtrl').hasError('colorThemeError')).toBe(true);
  });

  it('should close mat dialog ref if form group is valid', () => {
    const testApplicationState: ApplicationState = {
      todos: testTodos,
      colorTheme: 'greenlight'
    };
    component.transferFormGroup.get('importCtrl').setValue(JSON.stringify(testApplicationState));
    component.importJson();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should not close mat dialog ref if form group is invalid', () => {
    const testApplicationState: ApplicationState = {
      todos: todosWithoutId,
      colorTheme: 'greenlight'
    };
    component.transferFormGroup.get('importCtrl').setValue(JSON.stringify(testApplicationState));
    component.checkImportValidity();
    component.importJson();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });
});

export const testTodos: Todo[] = [
  {
    id: 1,
    title: 'Groceries',
    description: '-Eggs \n- Bread\n- Cereal',
    isComplete: false
  },
  {
    id: 2,
    title: 'Deposit christmas check',
    isComplete: true
  },
  {
    id: 3,
    title: 'Call mom',
    isComplete: true
  },
  {
    id: 4,
    title: 'Walk the dog',
    isComplete: false
  },
  {
    id: 5,
    title: 'Book train ticket',
    description: 'Train 02/06/19 Departure TOULOUSE at 10:23 - Arrival PARIS at 17:42',
    isComplete: false
  }
];

export const todosWithoutId: Todo[] = [
  {
    id: null,
    title: 'Deposit christmas check',
    isComplete: true
  }
];

export const todosWithoutTitle: Todo[] = [
  {
    id: 1,
    title: null,
    isComplete: true
  }
];

export const todosWithoutIsComplete: Todo[] = [
  {
    id: null,
    title: 'Deposit christmas check',
    isComplete: null
  }
];

export const testJsonString = `{
    "todos": [
      {
        "id":5,
        "title":"Book train ticket",
        "description":"Train 02/06/19 Departure TOULOUSE at 10:23 - Arrival PARIS at 17:42",
        "isComplete":false
      },
      {
        "id":4,
        "title":"Walk the dog",
        "description":null,
        "isComplete":false
      },
      {
        "id":3,
        "title":"Call mom",
        "description":null,
        "isComplete":true
      },
      {
        "id":2,
        "title":"Deposit christmas check",
        "description":null,
        "isComplete":true
      },
      {
        "id":1,
        "title":"Groceries",
        "description":"-Eggs\n- Bread\n- Cereal",
        "isComplete":false
      }
    ],
    "colorTheme": "bluelight"
  }`;


export class MockDialogRef {
    close: () => { };
}
