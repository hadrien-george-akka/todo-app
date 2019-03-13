import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { rootReducer , AppState} from '../../../app.reducer';
import { Todo } from 'src/app/model/model.interface';
import * as TodoActions from '../../../model/todo/todo.actions';
import { TodosListComponent } from './todos-list.component';
import { TodoDisplayComponent } from './todo-display/todo-display.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { MyButtonComponent } from '../../../theme/my-button/my-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';


describe('TodoListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodosListComponent,
        TodoDisplayComponent,
        TodoAddComponent,
        MyButtonComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        StoreModule.forRoot(rootReducer)
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the activeTodos and completeTodos', () => {
    const action = new TodoActions.PopulateTodosAction(testTodos);
    store.dispatch(action);
    expect(component.activeTodos).toEqual(testActiveTodos);
    expect(component.completeTodos).toEqual(testCompleteTodos);
  });

  // it('should call populateActiveTodos and return list of active todos', () => {
  //   const response: Todo[] = testTodos;
  //   const action = new TodoActions.PopulateTodosAction(testTodos);
  //   store.dispatch(action);
  //   spyOn(store, 'select').and.returnValue(of(response));
  //   component.populateActiveTodos();
  //   fixture.detectChanges();

  //   expect(component.activeTodos).toEqual(response);
  // });

  // it('should call populateCompleteTodos and return list of complete todos', () => {
  //   const response: Todo[] = testTodos;
  //   const action = new TodoActions.PopulateTodosAction(testTodos);
  //   store.dispatch(action);
  //   spyOn(store, 'select').and.returnValue(of(response));
  //   component.populateCompleteTodos();
  //   fixture.detectChanges();
  //   console.log('---------LOOG => ', response);
  //   console.log('---------LOOG => ', component.completeTodos);

  //   expect(component.completeTodos).toEqual(response);
  // });
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

export const testActiveTodos: Todo[] = [
  {
    id: 1,
    title: 'Groceries',
    description: '-Eggs \n- Bread\n- Cereal',
    isComplete: false
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

export const testCompleteTodos: Todo[] = [
  {
    id: 2,
    title: 'Deposit christmas check',
    isComplete: true
  },
  {
    id: 3,
    title: 'Call mom',
    isComplete: true
  }
];

