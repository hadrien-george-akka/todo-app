import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as TodoActions from '../todo.actions';
import { getTodos } from '../todo.selectors';
import { AppState } from 'src/app/app.reducer';

@Injectable()
export class UpdateLocalStorageEffects {

  constructor(
    public store: Store<AppState>,
    private actions$: Actions,
  ) {
  }

  @Effect({dispatch: false})
  public updateTodos$ = this.actions$.pipe(
    ofType(TodoActions.POPULATE_TODOS, TodoActions.ADD_TODO, TodoActions.UPDATE_TODO, TodoActions.DELETE_TODO, TodoActions.TOGGLE_TODO),
    tap( () => {
      this.store.select(getTodos).subscribe(
        (todos) => {
          localStorage.setItem('todos', JSON.stringify(todos));
        }
      );
    }));
}
