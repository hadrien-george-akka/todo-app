import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as TodoActions from '../todo.actions';
import { getTodos } from '../todo.selectors';
import { TodoService } from 'src/app/core/services/todo.service';

@Injectable()
export class UpdateLocalStorageEffects {

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {
  }

  @Effect({dispatch: false})
  public updateTodos$ = this.actions$.pipe(
    ofType(TodoActions.POPULATE_TODOS, TodoActions.ADD_TODO, TodoActions.UPDATE_TODO, TodoActions.DELETE_TODO, TodoActions.TOGGLE_TODO),
    tap( () => {
      this.todoService.store.select(getTodos).subscribe(
        (todos) => {
          localStorage.setItem('todos', JSON.stringify(todos));
        }
      );
    }));
}
