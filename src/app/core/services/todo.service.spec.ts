
import { TodoService } from './todo.service';
import { TestBed } from '@angular/core/testing';
import { Todo } from 'src/app/model/todo.interface';
import { Store, StoreModule } from '@ngrx/store';
import { AppState, rootReducer } from 'src/app/app.reducer';

describe('TodoService', () => {
  let service: TodoService;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(rootReducer)
      ],
      providers: [
        TodoService
      ]
    });
    service = TestBed.get(TodoService);
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return all todos when getTodoList() is called', () => {
    const todos = service.getTodoList();
    expect(todos).toEqual(testTodos);
  });

  it('should return only active todos from all todos list when getActiveTodoList() is called', () => {
    const todos = service.getActiveTodoList(testTodos);
    expect(todos).toEqual(testActiveTodos);
  });

  it('should return only complete todos from all todos list when getCompleteTodoList() is called', () => {
    const todos = service.getCompleteTodoList(testTodos);
    expect(todos).toEqual(testCompleteTodos);
  });

  it('should return a todo from its id value', () => {
    const todos = service.getTodoList();
    const todo = service.getTodoById(todos, 3);
    expect(todo).toEqual(todos[2]);
  });

  it('should return the maximum id value from a todo list', () => {
    const todos = service.getTodoList();
    expect(service.getMaxId(todos)).toEqual(5);
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

