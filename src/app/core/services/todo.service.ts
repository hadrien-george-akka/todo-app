import { Injectable } from '@angular/core';
import { Todo, mockTodos } from '../../model/todo.interface';

/**
 * Todo data service
 */
@Injectable()
export class TodoService {

  /** List of todos */
  todoList: Todo[] = [];

  constructor() {
    this.getTodoList();
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

  /**
   * Return a todo from is id value
   * @param id Todo id value
   */
  getTodoById(id: number): Todo {
    return this.todoList.find(todo => todo.id === id);
  }

  /**
   * Update a specific todo in todosList
   * @param todo Todo to update
   */
  updateTodo(todoUpdate: Todo): void {
    const index = this.todoList.findIndex(todo => todo.id === todoUpdate.id);
    this.todoList[index] = todoUpdate;
  }

}
