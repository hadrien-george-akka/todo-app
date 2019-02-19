import { ActionReducerMap } from '@ngrx/store';

import { TodosReducer } from './model/todo.reducer';
import { Todo } from './model/todo.interface';

export interface AppState {
  todos: Todo[];
}

export const rootReducer: ActionReducerMap<AppState> = {
  todos: TodosReducer
};
