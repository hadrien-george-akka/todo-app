import { Todo } from './todo.interface';
import * as TodoActions from './todo.actions';

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
            text: action.text
          };
        } else {
          return todo;
        }
      });
    }
    default: {
      return state;
    }
  }
}
