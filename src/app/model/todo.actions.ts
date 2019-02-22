import { Action } from '@ngrx/store';
import { Todo } from './todo.interface';


export const TOGGLE_TODO = '[TODO] toggle';
export const UPDATE_TODO = '[TODO] update';
export const POPULATE_TODOS  = '[TODO] populate';

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

export type TodoActionType =
UpdateAction | PopulateTodosAction | ToggleAction;
