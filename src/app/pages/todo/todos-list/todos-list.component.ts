import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../model/model.interface';

import { TodoService } from '../../../core/services/todo.service';
import { getTodos } from 'src/app/model/todo/todo.selectors';

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
   * @param todoService Todo service
   */
  constructor(
    private todoService: TodoService
  ) {
    this.todos = this.todoService.todoList.length === 0 ?
      this.todoService.getTodoList() : this.todoService.todoList;
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
    this.todoService.store.select(getTodos)
    .subscribe(todos => {
      this.activeTodos = this.todoService.getActiveTodoList(todos);
      this.completeTodos = this.todoService.getCompleteTodoList(todos);
    });
  }

}
