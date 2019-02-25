import { Injectable } from '@angular/core';

import { Todo, mockTodos } from '../../model/todo.interface';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as TodoActions from './../../model/todo.actions';

/**
 * Todo data service
 */
@Injectable()
export class TodoService {

  /** List of todos */
  todoList: Todo[] = [];

  /** Max id value in todo list */
  maxId: number;

  constructor(
    public store: Store<AppState>
  ) {
    this.todoList = this.getTodoList();
    this.maxId = this.getMaxId(this.todoList);
    this.store.dispatch(new TodoActions.PopulateTodosAction(this.todoList));
  }

  /**
   * Return mocked todos from todo interface
   */
  getTodoList(): Todo[] {
    return mockTodos();
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
   * Return a todo from a list of todos and is id value
   * @param todos List of todos
   * @param id Todo id value
   */
  getTodoById(todos: Todo[], id: number): Todo {
    return todos.find(todo => todo.id === id);
  }

  /**
   * Return the maximum id value from list of todos
   * @param todos List of todos
   */
  getMaxId(todos: Todo[]): number {
    const maxIdTodo: Todo = todos.reduce((prev, current) => (prev.id > current.id) ? prev : current);
    return  maxIdTodo.id;
  }

}
