import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/model/todo.interface';
import * as TodoActions from '../../../model/todo.actions';

/**
 * Add Todo component
 */
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent {

  /** Todo object to add */
  todo: Todo = {
    id: null,
    title: null,
    description: null,
    isComplete: false
  };

  /** Boolean is the expansion pannel expanded */
  pannelExpanded = false;

  /** Todo form group */
  todoFormGroup: FormGroup;

  constructor(
    private todoService: TodoService
  ) {
    // Initiate todo form group
    this.todoFormGroup = new FormGroup({
      titleTodoCtrl: new FormControl('', Validators.required),
      descriptionTodoCtrl: new FormControl('')
    });
  }

  /**
   * Add a new todo to the store
   * Close the material expansion pannel and reset form values
   */
  addTodo() {
    if (this.todoFormGroup.valid) {
      this.todoService.maxId++;

      this.todo.id = this.todoService.maxId;
      this.todo.title = this.todoFormGroup.get('titleTodoCtrl').value;
      this.todo.description = this.todoFormGroup.get('descriptionTodoCtrl').value;

      const action = new TodoActions.AddTodoAction(this.todo.id, this.todo.title, this.todo.description, this.todo.isComplete);
      this.todoService.store.dispatch(action);
      // this.todoService.sortTodoList();

      this.togglePannel();
      this.todoFormGroup.get('titleTodoCtrl').reset();
      this.todoFormGroup.get('descriptionTodoCtrl').reset();
    }
  }

  /**
   * Toggle the material expansion pannel
   */
  togglePannel() {
    this.pannelExpanded = !this.pannelExpanded;
  }

}
