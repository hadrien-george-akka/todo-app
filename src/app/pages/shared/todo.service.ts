import { Injectable } from '@angular/core';
import { Todo, mockTodos } from 'src/app/model/todo.interface';
import { TodosListComponent } from '../todos-list/todos-list.component';

/**
 * Todo data service
 */
@Injectable()
export class TodoService {

  /** List of todos */
  todoList: Todo[];

  constructor() {
  }

  /**
   * Return mocked todos from todo interface
   */
  getTodoList(): Todo[] {
    this.todoList = mockTodos();
    return this.todoList;
  }

  /**
   * Filter only active todos from list of todos
   * @param todos List of todos
   */
  getActiveTodoList(todos: Todo[]): Todo[] {
    return todos.filter(todo => todo.isComplete === false);
  }

  /**
   * Filter only active todos from list of todos
   * @param todos List of todos
   */
  getCompleteTodoList(todos: Todo[]): Todo[] {
    return todos.filter(todo => todo.isComplete === true);
  }


}
