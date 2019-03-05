import { Action } from '@ngrx/store';
import { Todo } from './todo.interface';


export const ADD_TODO    = '[TODO] add';
export const DELETE_TODO = '[TODO] delete';
export const UPDATE_TODO = '[TODO] update';
export const TOGGLE_TODO = '[TODO] toggle';
export const POPULATE_TODOS  = '[TODO] populate';
export const SORT_TODOS = '[TODO] sort';

export class ToggleAction implements Action {
  readonly type = TOGGLE_TODO;

  constructor(
    public id: number
  ) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE_TODO;

  constructor(
    public id: number,
    public title: string,
    public description: string,
  ) {}
}

export class PopulateTodosAction implements Action {
  readonly type = POPULATE_TODOS;

  constructor(
    public todos: Todo[]
  ) {}
}

export class DeleteTodoAction implements Action {
  readonly type = DELETE_TODO;

  constructor(
    public id: number
  ) {}
}

export class AddTodoAction implements Action {
  readonly type = ADD_TODO;

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public isComplete: boolean
  ) {}
}

export class SortTodoAction implements Action {
  readonly type = SORT_TODOS;

  constructor(
  ) {}
}

export type TodoActionType =
UpdateAction | PopulateTodosAction | ToggleAction | DeleteTodoAction | AddTodoAction | SortTodoAction;
