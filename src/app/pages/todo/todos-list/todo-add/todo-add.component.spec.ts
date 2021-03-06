import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { AppState, rootReducer } from 'src/app/app.reducer';
import { TodoAddComponent } from './todo-add.component';
import { TodoService } from 'src/app/core/services/todo.service';
import { MyButtonComponent } from 'src/app/theme/my-button/my-button.component';
import * as TodoActions from '../../../../model/todo/todo.actions';
import { Todo } from 'src/app/model/model.interface';

describe('TodoAddComponent', () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoAddComponent,
        MyButtonComponent
       ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        StoreModule.forRoot(rootReducer),
      ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the expansion panel', () => {
    component.pannelExpanded = false;
    component.togglePannel();
    expect(component.pannelExpanded).toBe(true);
  });

  it('should add a todo to the store', () => {
    component.todoFormGroup.get('titleTodoCtrl').setValue('new title');
    component.todoFormGroup.get('descriptionTodoCtrl').setValue('new description');
    component.addTodo();
    const action = new TodoActions.AddTodoAction(validTodo);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should not add a todo to the store if form is not valid', () => {
    component.todoFormGroup.get('titleTodoCtrl').setValue(undefined);
    component.todoFormGroup.get('descriptionTodoCtrl').setValue(undefined);
    component.addTodo();
    const action = new TodoActions.AddTodoAction(invalidTodo);
    expect(store.dispatch).not.toHaveBeenCalledWith(action);
  });

  it('should reset the form after adding todo', () => {
    component.todoFormGroup.get('titleTodoCtrl').setValue('new title');
    component.todoFormGroup.get('descriptionTodoCtrl').setValue('new description');
    component.addTodo();
    expect(component.todoFormGroup.get('titleTodoCtrl').value).toBe(null);
    expect(component.todoFormGroup.get('descriptionTodoCtrl').value).toBe(null);
  });
});

export const validTodo: Todo = {
  id: 1,
  title: 'new title',
  description: 'new description',
  isComplete: false
};

export const invalidTodo: Todo = {
  id: 2,
  title: undefined,
  description: undefined,
  isComplete: false
};
