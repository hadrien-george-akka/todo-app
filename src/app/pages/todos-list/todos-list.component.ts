import { Component, OnInit } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

/**
 * Display the current Todos list
 */
@Component({
  templateUrl: './todos-list.component.html'
})
export class TodosListComponent implements OnInit {

  todos: Todo[];

  constructor() {
    this.todos = mockTodos();
    console.log(this.todos);
  }

  ngOnInit() {

  }
}
