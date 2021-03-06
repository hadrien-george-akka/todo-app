import { Todo } from './../model.interface';
import * as TodoActions from './todo.actions';
import { stat } from 'fs';

const initialState: Todo[] = [];

export function TodosReducer(state: Todo[] = initialState, action: TodoActions.TodoActionType) {
  switch (action.type) {

    case TodoActions.POPULATE_TODOS: {
      return action.todos;
    }
    case TodoActions.TOGGLE_TODO: {
      return state.map(todo => {
        if (action.id === todo.id) {
          return {
            ...todo,
            isComplete: !todo.isComplete
          };
        } else {
          return todo;
        }
      });
    }
    case TodoActions.UPDATE_TODO: {
      return state.map(todo => {
        if (action.id === todo.id) {
          return {
            ...todo,
            title: action.title,
            description: action.description
          };
        } else {
          return todo;
        }
      });
    }
    case TodoActions.DELETE_TODO: {
      return state.filter(todo => action.id !== todo.id );
    }
    case TodoActions.ADD_TODO: {
      return [
        ...state,
        {
          id: action.todo.id,
          title: action.todo.title,
          description: action.todo.description,
          isComplete: action.todo.isComplete
        }
      ];
    }
    case TodoActions.SORT_TODOS: {
      return [
        ...state
          .sort((a: Todo, b: Todo) =>
            (a.id > b.id) ? -1 : 1
        )
      ];
    }
    default: {
      return state;
    }
  }
}
