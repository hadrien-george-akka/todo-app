import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule, Store } from '@ngrx/store';

import { rootReducer , AppState} from '../../app.reducer';
import { Todo } from 'src/app/model/todo.interface';
import * as TodoActions from './../../model/todo.actions';
import { TodoDisplayComponent } from './todo-display.component';

describe('TodoDisplayComponent', () => {
  let component: TodoDisplayComponent;
  let fixture: ComponentFixture<TodoDisplayComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoDisplayComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        StoreModule.forRoot(rootReducer)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoDisplayComponent);
    component = fixture.componentInstance;
    component.todo = { id: 42, title: 'test input', isComplete: true};

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
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
