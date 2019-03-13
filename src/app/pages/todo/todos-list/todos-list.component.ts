import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { Todo } from '../../../model/model.interface';
import { getActiveTodos, getCompleteTodos } from 'src/app/model/todo/todo.selectors';
import { TodoService } from '../../../core/services/todo.service';

/**
 * Display the current Todos list
 */
@Component({
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  /** Array of all existing todos */
  todos: Todo[];

  /** Array of uncomplete todos */
  activeTodos: Todo[];

  /** Array of complete todos */
  completeTodos: Todo[];

  /**
   * Component dependencies
   * @param store Ngrx store
   */
  constructor(
    public store: Store<AppState>,
  ) {

  }

  /**
   * Angular OnInit lifecycle override
   */
  ngOnInit() {
    this.populateActiveTodos();
    this.populateCompleteTodos();
  }

  /**
   * Populate the active todo list
   */
  populateActiveTodos() {
    this.store.select(getActiveTodos)
      .subscribe(todos => this.activeTodos = todos);
  }

  /**
   * Populate the complete todo list
   */
  populateCompleteTodos() {
    this.store.select(getCompleteTodos)
      .subscribe(todos => this.completeTodos = todos);
  }

}
