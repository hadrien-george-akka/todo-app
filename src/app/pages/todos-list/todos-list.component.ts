import { Component, OnInit } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

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

  constructor() {
    this.allTodos = mockTodos();
  }

  ngOnInit() {
    this.todos = this.allTodos.filter(todo => todo.isComplete === false);
    this.completedTodos = this.allTodos.filter(todo => todo.isComplete === true);
  }
}
