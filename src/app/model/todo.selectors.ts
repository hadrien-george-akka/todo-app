import { AppState } from './../app.reducer';

export const getState  = (state: AppState) => state;
export const getTodos  = (state: AppState) => state.todos;

