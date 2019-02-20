import { Component, OnInit } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { getVisibleTodos } from '../../model/todo.selectors';
import * as TodoActions from './../../model/todo.actions';
import * as FilterActions from './../../model/filter/filter.actions';
import { FormControl } from '@angular/forms';
import { TodoService } from '../shared/todo.service';

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

  todoStateCtrl: FormControl;


  /**
   * Component dependencies
   */
  constructor(
    private store: Store<AppState>,
    private todoService: TodoService
  ) {
    // this.allTodos = mockTodos();
    this.store.dispatch(new TodoActions.PopulateTodosAction(
      this.todoService.getTodoList()
    ));
  }

  ngOnInit() {

    // this.getActiveTodos();
    // this.getCompleteTodos();
    this.populateTodosByState();
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
      switch (state) {
        case TodoState.ACTIVE:
          this.activeTodos = todos;
          break;
        case TodoState.COMPLETE:
          this.completeTodos = todos;
          break;
        default:
          this.activeTodos = this.todoService.getActiveTodoList(todos);
          this.completeTodos = this.todoService.getCompleteTodoList(todos);
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
