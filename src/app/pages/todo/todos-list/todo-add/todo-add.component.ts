import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import * as TodoActions from '../../../../model/todo/todo.actions';
import { Todo } from 'src/app/model/model.interface';
import { TodoService } from 'src/app/core/services/todo.service';
import { getTodoMaxId } from 'src/app/model/todo/todo.selectors';

/**
 * Add Todo component
 */
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  /** Maximum id value in store */
  maxId: number;

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
    public store: Store<AppState>,
  ) {
    // Initiate todo form group
    this.todoFormGroup = new FormGroup({
      titleTodoCtrl: new FormControl('', Validators.required),
      descriptionTodoCtrl: new FormControl('')
    });

  }

  ngOnInit() {
    this.store.select(getTodoMaxId).subscribe((todo) => {
      this.maxId = todo ? todo.id : 0;
    });
  }

  /**
   * Add a new todo to the store
   * Close the material expansion pannel and reset form values
   */
  addTodo() {
    if (this.todoFormGroup.valid) {
      this.maxId++;

      this.todo.id = this.maxId;
      this.todo.title = this.todoFormGroup.get('titleTodoCtrl').value;
      this.todo.description = this.todoFormGroup.get('descriptionTodoCtrl').value;

      const action = new TodoActions.AddTodoAction(this.todo);
      this.store.dispatch(action);

      this.togglePannel();
      this.todoFormGroup.reset();
    }
  }

  /**
   * Toggle the material expansion pannel
   */
  togglePannel() {
    this.pannelExpanded = !this.pannelExpanded;
  }

  get titleTodoCtrl() {
    return this.todoFormGroup.get('titleTodoCtrl');
  }

}
