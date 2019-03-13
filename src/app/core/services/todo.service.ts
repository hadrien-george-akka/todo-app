import { Injectable } from '@angular/core';

import { Todo } from '../../model/model.interface';

/**
 * Todo data service
 */
@Injectable()
export class TodoService {

  /** List of todos */
  todoList: Todo[] = [];

  constructor(
  ) {
    this.todoList = this.getTodoListFromLocalStorage();
  }

  /**
   * Return todos from localstorage
   */
  getTodoListFromLocalStorage(): Todo[] {
    // console.log('TODOS : ', JSON.parse(localStorage.getItem('todos') || '[]'));
    return JSON.parse(localStorage.getItem('todos') || '[]');
  }

}
