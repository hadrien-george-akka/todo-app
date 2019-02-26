import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatCardModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import {Location} from '@angular/common';

import { rootReducer, AppState } from 'src/app/app.reducer';
import * as TodoActions from '../../model/todo.actions';
import { TodoUpdateComponent } from './todo-update.component';
import { TodoService } from 'src/app/core/services/todo.service';
import { MyButtonComponent } from 'src/app/theme/my-button/my-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Todo } from 'src/app/model/todo.interface';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, Observable, from } from 'rxjs';

describe('TodoUpdateComponent', () => {
  let component: TodoUpdateComponent;
  let fixture: ComponentFixture<TodoUpdateComponent>;
  let store: Store<AppState>;
  let todoService: TodoService;
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
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: TestComponent},
            {path: 'update/:id', component: TestUpdateComponent}
        ]),
      ],
      providers: [
        TodoService,
        // {
        //   provide: ActivatedRoute, useValue: {
        //     paramMap: of(convertToParamMap({ id: 3 }))
        //   }
        // }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    todoService = new TodoService(store);
    spyOn(todoService.store, 'dispatch').and.callThrough();

    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(TodoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.todo = testTodo;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update todo when form is valid', () => {
    component.todoFormGroup.get('titleTodoCtrl').setValue('update title');
    component.todoFormGroup.get('descriptionTodoCtrl').setValue('update description');
    component.updateTodo();
    const action = new TodoActions.UpdateAction(component.todo.id, 'update title', 'update description');
    expect(todoService.store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should not update todo when form is invalid', () => {
    component.todoFormGroup.get('titleTodoCtrl').setValue(null);
    component.todoFormGroup.get('descriptionTodoCtrl').setValue(null);
    component.updateTodo();
    const action = new TodoActions.UpdateAction(component.todo.id, null, null);
    expect(todoService.store.dispatch).not.toHaveBeenCalledWith(action);
  });

  it('should navigate to list route', fakeAsync(() => {
    component.navigateToList();
    tick();
    expect(location.path()).toBe('/list');
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


export const testTodo: Todo = {id: 3, title: 'Call mom', isComplete: true};
