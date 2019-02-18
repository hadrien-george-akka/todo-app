import { Component, OnInit } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

/**
 * Display the current Todos list
 */
@Component({
  templateUrl: './todos-list.component.html'
})
export class TodosListComponent implements OnInit {

  private todos: Todo[];

  constructor() {
    this.todos = mockTodos();
  }

  ngOnInit() {

  }
}
