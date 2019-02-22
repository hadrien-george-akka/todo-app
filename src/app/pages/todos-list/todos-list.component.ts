import { Component, OnInit } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { TodoService } from '../../core/services/todo.service';
import * as TodoActions from './../../model/todo.actions';
import { getTodos } from 'src/app/model/todo.selectors';

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
   * @param store NgRx store
   * @param todoService Todo service
   */
  constructor(
    private store: Store<AppState>,
    private todoService: TodoService
  ) {
    this.todos = this.todoService.getTodoList();
    this.store.dispatch(new TodoActions.PopulateTodosAction(this.todos));
  }

  /**
   * Angular OnInit lifecycle override
   */
  ngOnInit() {
    this.populateTodosByState();
  }

  /**
   * Populate the todos variables in function of todo state
   */
  private populateTodosByState() {
    this.store.select(getTodos)
    .subscribe(todos => {
      this.activeTodos = this.todoService.getActiveTodoList(todos);
      this.completeTodos = this.todoService.getCompleteTodoList(todos);
    });
  }

}
