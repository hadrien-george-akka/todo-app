import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatMenuModule, MatButtonModule, MatFormFieldModule, MatDialog } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';

import { HeaderComponent } from './header.component';
import { TransferComponent } from './transfer/transfer.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { rootReducer, AppState } from 'src/app/app.reducer';
import { ColorPickerService, Favicons, BrowserFavicons, BROWSER_FAVICONS_CONFIG } from 'src/app/core/services/color-picker.service';
import { browserFaviconsConfigTest } from './color-picker/color-picker.component.spec';
import { Todo, ApplicationState } from 'src/app/model/model.interface';
import * as TodoActions from '../../model/todo/todo.actions';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let colorPickerService: ColorPickerService;
  let dialog: MatDialogMock;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TransferComponent,
        ColorPickerComponent
      ],
      imports: [
        MatMenuModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        StoreModule.forRoot(rootReducer)
      ],
      providers: [
        ColorPickerService,
        {
          provide: Favicons,
          useClass: BrowserFavicons
        },
        {
          provide: BROWSER_FAVICONS_CONFIG,
          useValue: browserFaviconsConfigTest
        },
        {
          provide: MatDialog, useClass: MatDialogMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    colorPickerService = TestBed.get(ColorPickerService);
    dialog = TestBed.get(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud open transfer dialog when openTransferDialog function is called', fakeAsync(() => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(colorPickerService, 'setColorClass').and.callThrough();

    component.openTransferDialog();
    const action = new TodoActions.PopulateTodosAction(testTodos);

    expect(dialog.open).toHaveBeenCalled();
    expect(colorPickerService.setColorClass).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));
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
  }
];

export const dialogAfterClosedValue: ApplicationState = {
  colorTheme: 'greenlight',
  todos: testTodos
};

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(dialogAfterClosedValue)
    };
  }
}
