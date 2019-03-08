import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {Location} from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

import { rootReducer , AppState} from '../../../../app.reducer';
import { Todo } from 'src/app/model/todo.interface';
import * as TodoActions from '../../../../model/todo.actions';
import { TodoDisplayComponent } from './todo-display.component';
import { TodoService } from 'src/app/core/services/todo.service';
import { TestingCompiler } from '@angular/core/testing/src/test_compiler';
import { Component } from '@angular/core';

describe('TodoDisplayComponent', () => {
  let component: TodoDisplayComponent;
  let fixture: ComponentFixture<TodoDisplayComponent>;
  let store: Store<AppState>;
  let route: ActivatedRoute;
  let router: Router;
  let location: Location;
  let todoService: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoDisplayComponent,
        TestComponent,
        TestUpdateComponent
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatExpansionModule,
        StoreModule.forRoot(rootReducer),
        RouterTestingModule.withRoutes([
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: TestComponent},
          {path: 'update/:id', component: TestUpdateComponent}
        ]),
      ],
      providers: [
        TodoService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    todoService = new TodoService(store);
    spyOn(todoService.store, 'dispatch').and.callThrough();

    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(TodoDisplayComponent);
    component = fixture.componentInstance;
    component.todo = { id: 42, title: 'test input', isComplete: true};

    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set input todo state value to form control', () => {
    component.ngOnInit();
    expect(component.todoFormGroup.get('stateTodoCtrl').value).toBe(component.todo.isComplete);
  });

  it('should dispatch an action when stateTodoCtrl change state', () => {
    component.todoFormGroup.get('stateTodoCtrl').setValue(true);
    const action = new TodoActions.ToggleAction(component.todo.id);
    expect(todoService.store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should navigate to update route', fakeAsync(() => {
    component.showTodoUpdate();
    tick();
    expect(location.path()).toBe('/update/42');
  }));

  it('should delete the todo input', () => {
    component.deleteTodo();
    const action = new TodoActions.DeleteTodoAction(component.todo.id);
    expect(todoService.store.dispatch).toHaveBeenCalledWith(action);
  });
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
