import { ActionReducerMap } from '@ngrx/store';

import { TodosReducer } from './model/todo/todo.reducer';
import { Todo } from './model/model.interface';

export interface AppState {
  todos: Todo[];
}

export const rootReducer: ActionReducerMap<AppState> = {
  todos: TodosReducer
};
