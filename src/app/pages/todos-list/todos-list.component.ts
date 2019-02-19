import { Component, OnInit } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { getVisibleTodos } from 'src/app/model/todo.selectors';
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
  allTodos: Todo[];
  /** Array of uncomplete todos */
  todos: Todo[];
  /** Array of complete todos */
  completedTodos: Todo[];

  test: Todo[];

  /**
   * Component dependencies
   */
  constructor(
    private store: Store<AppState>
  ) {
    // this.allTodos = mockTodos();
    this.store.dispatch(new TodoActions.PopulateTodosAction(mockTodos()));
  }

  ngOnInit() {

    this.readTodosState();

    // this.todos = this.returnActiveTodos(this.allTodos);
    this.completedTodos = this.returnCompletedTodos(this.allTodos);

  }

  private readTodosState() {
    this.store.select(getVisibleTodos)
    .subscribe(todos => {
      console.log(todos);
      this.allTodos = todos;
    });
  }

  /**
   * Return an array of only completed todos from an array of todos
   * @param todos Array of todos
   */
  returnCompletedTodos(todos: Todo[]): Todo[] {
    return todos.filter(todo => todo.isComplete === true);
  }

  /**
   * Return an array of only not completed todos from an array of todos
   * @param todos Array of todos
   */
  returnActiveTodos() {
    this.store.dispatch(new FilterActions.SetFilterAction('SHOW_ACTIVE'));
  }
}
