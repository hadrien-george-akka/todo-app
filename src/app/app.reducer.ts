import { ActionReducerMap } from '@ngrx/store';

import { TodosReducer } from './model/todo.reducer';
import { FilterReducer } from './model/filter/filter.reducer';
import { Todo } from './model/todo.interface';

export interface AppState {
  todos: Todo[];
  filter: string;
}

export const rootReducer: ActionReducerMap<AppState> = {
  todos: TodosReducer,
  filter: FilterReducer
};
