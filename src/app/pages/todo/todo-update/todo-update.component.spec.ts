import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatCardModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import {Location} from '@angular/common';

import { rootReducer, AppState } from 'src/app/app.reducer';
import * as TodoActions from '../../../model/todo/todo.actions';
import { TodoUpdateComponent } from './todo-update.component';
import { MyButtonComponent } from 'src/app/theme/my-button/my-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Todo } from 'src/app/model/model.interface';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { getTodoById } from 'src/app/model/todo/todo.selectors';

describe('TodoUpdateComponent', () => {
  let component: TodoUpdateComponent;
  let fixture: ComponentFixture<TodoUpdateComponent>;
  let store: Store<AppState>;
  let route: ActivatedRoute;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoUpdateComponent,
        MyButtonComponent,
        TestComponent,
        TestUpdateComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        StoreModule.forRoot(rootReducer),
        RouterTestingModule
          .withRoutes([
            {path: '', redirectTo: 'todo/list', pathMatch: 'full'},
            {path: 'todo/list', component: TestComponent},
            {path: 'todo/update/:id', component: TestUpdateComponent}
        ]),
      ],
      providers: [
        // {
        //   provide: ActivatedRoute, useValue: {
        //     paramMap: of(convertToParamMap({ id: 3 }))
        //   }
        // }
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 3 })
            }
          }

        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(TodoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // component.todo = testTodo;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the paramMap id of angular activated route', () => {
    expect(component.getTodoId()).toEqual(3);
  });

  it('should get the todo from paramMap id', () => {
    const action = new TodoActions.PopulateTodosAction(testTodos);
    store.dispatch(action);
    expect(component.todo).toBe(testTodos[2]);
  });

  it('should update todo', () => {
    const populate = new TodoActions.PopulateTodosAction(testTodos);
    store.dispatch(populate);
    component.todoFormGroup.get('titleTodoCtrl').setValue('update title');
    component.todoFormGroup.get('descriptionTodoCtrl').setValue('update description');
    component.updateTodo();
    const action = new TodoActions.UpdateAction(component.getTodoId(), 'update title', 'update description');
    expect(store.dispatch).toHaveBeenCalledWith(action);

    let todoUpdate: Todo;
    store.select(getTodoById(3)).subscribe(todo => todoUpdate = todo);
    expect(todoUpdate.id).toBe(3);
    expect(todoUpdate.title).toBe('update title');
    expect(todoUpdate.description).toBe('update description');
  });

  it('should not update todo if form is invalid', () => {
    component.todoFormGroup.get('titleTodoCtrl').setValue(null);
    component.todoFormGroup.get('descriptionTodoCtrl').setValue(null);
    component.updateTodo();
    const action = new TodoActions.UpdateAction(component.getTodoId(), null, null);
    expect(store.dispatch).not.toHaveBeenCalledWith(action);
  });

  it('should navigate to list route', fakeAsync(() => {
    component.navigateToList();
    tick();
    expect(location.path()).toBe('/todo/list');
  }));
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'blank-cmp',
  template: ``
})
// tslint:disable-next-line:component-class-suffix
export class TestComponent {
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'blank-cmp-upd',
  template: ``
})
// tslint:disable-next-line:component-class-suffix
export class TestUpdateComponent {
}


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
