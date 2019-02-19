import { Component, OnInit } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { getVisibleTodos } from '../../model/todo.selectors';
import * as TodoActions from './../../model/todo.actions';
import * as FilterActions from './../../model/filter/filter.actions';

/**
 * Display the current Todos list
 */
@Component({
  templateUrl: './todos-list.component.html'
})
export class TodosListComponent implements OnInit {

  /** Array of all existing todos */
  todos: Todo[];
  /** Array of uncomplete todos */
  activeTodos: Todo[];
  /** Array of complete todos */
  completeTodos: Todo[];

  test: Todo[];

  /**
   * Component dependencies
   */
  constructor(
    private store: Store<AppState>
  ) {
    // this.allTodos = mockTodos();
    this.store.dispatch(new TodoActions.PopulateTodosAction(mockTodos()));
    this.getActiveTodos();
  }
  
  ngOnInit() {
    this.getCompleteTodos();

  }

  /**
   * Populate the todos variables in function of filter
   * @param state String to filter
   * 'active' will return only active todos
   * 'complete' will return only complete todos
   * any other value will return all todos
   */
  private populateTodosByState(state?: string) {
    this.store.select(getVisibleTodos)
    .subscribe(todos => {
      console.log(state, todos)
      switch (state) {
        case TodoState.ACTIVE:
          this.activeTodos = todos;
          break;
        case TodoState.COMPLETE:
          this.completeTodos = todos;
          break;
        default:
          this.todos = todos;
      }
    });
  }

  /**
   * Filter todos by state and populate the activeTodo variable with all complete todos
   */
  getCompleteTodos() {
    this.store.dispatch(new FilterActions.SetFilterAction('SHOW_COMPLETED'));
    this.populateTodosByState('complete');
  }

  /**
   * Filter todos by state and populate the activeTodo variable with all active todos
   */
  getActiveTodos() {
    this.store.dispatch(new FilterActions.SetFilterAction('SHOW_ACTIVE'));
    this.populateTodosByState('active');
  }

}

export enum TodoState {
  ACTIVE = 'active',
  COMPLETE = 'complete'
}
