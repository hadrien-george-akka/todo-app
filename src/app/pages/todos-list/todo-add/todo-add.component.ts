import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/model/todo.interface';

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
  todoToAdd: Todo;

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

  test() {
    console.log('test');
  }

}
