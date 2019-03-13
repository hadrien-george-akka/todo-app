import { AppState } from '../../app.reducer';
import { createSelector } from '@ngrx/store';

export const getState  = (state: AppState) => state;

export const getTodos  = (state: AppState) => state.todos;

export const getActiveTodos = (state: AppState) => {
  return state.todos.filter(todo => todo.isComplete === false);
};

export const getCompleteTodos = (state: AppState) => {
  return state.todos.filter(todo => todo.isComplete === true);
};

export const getTodoById = (id: number) => createSelector(getTodos, (todos) => {
  return todos.find(todo => todo.id === id);
});

export const getTodoMaxId = (state: AppState) => {
  if (state.todos.length > 0) {
    return state.todos.reduce((prev, current) => (prev.id > current.id) ? prev : current);
  }
};
