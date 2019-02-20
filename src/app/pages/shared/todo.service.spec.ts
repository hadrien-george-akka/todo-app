
import { TodoService } from './todo.service';
import { TestBed } from '@angular/core/testing';
import { Todo } from 'src/app/model/todo.interface';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService
      ]
    });
    service = TestBed.get(TodoService);
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

