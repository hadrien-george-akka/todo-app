import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';

import * as TodoActions from '../todo.actions';

@Injectable()
export class SortTodosEffects {

  constructor(
    private actions$: Actions,
  ) {
  }

  @Effect()
  public sortTodo$ = this.actions$.pipe(
    ofType(TodoActions.ADD_TODO),
    mapTo(
      new TodoActions.SortTodoAction()
    )
  );


}
