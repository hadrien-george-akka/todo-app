
import { TodoService } from './todo.service';
import { TestBed } from '@angular/core/testing';
import { Todo } from 'src/app/model/model.interface';
import { Store, StoreModule } from '@ngrx/store';
import { AppState, rootReducer } from 'src/app/app.reducer';

describe('TodoService', () => {
  let service: TodoService;
  let store: Store<AppState>;
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

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return all todos when getTodoListFromLocalStorage() is called', () => {
    expect(service.getTodoListFromLocalStorage()).toEqual([]);

    localStorage.setItem('todos', JSON.stringify(testTodos));
    const todos = service.getTodoListFromLocalStorage();
    expect(todos).toEqual(testTodos);
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

// export const testActiveTodos: Todo[] = [
//   {
//     id: 1,
//     title: 'Groceries',
//     description: '-Eggs \n- Bread\n- Cereal',
//     isComplete: false
//   },
//   {
//     id: 4,
//     title: 'Walk the dog',
//     isComplete: false
//   },
//   {
//     id: 5,
//     title: 'Book train ticket',
//     description: 'Train 02/06/19 Departure TOULOUSE at 10:23 - Arrival PARIS at 17:42',
//     isComplete: false
//   }
// ];

// export const testCompleteTodos: Todo[] = [
//   {
//     id: 2,
//     title: 'Deposit christmas check',
//     isComplete: true
//   },
//   {
//     id: 3,
//     title: 'Call mom',
//     isComplete: true
//   }
// ];

