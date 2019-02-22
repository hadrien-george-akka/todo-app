import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/model/todo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as TodoActions from './../../model/todo.actions';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

/**
 * Todo update component
 */
@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss']
})
export class TodoUpdateComponent implements OnInit {

  /** Todo object to updates */
  todo: Todo;

  /** Boolean values does todo with route param id exist */
  isTodoExist = true;

  /** Error message to display if isTodoExist is false */
  errorTodoNotExist = 'This TODO does not exist';

  /** Todo form group */
  todoFormGroup: FormGroup;

  /**
   * Component dependencies
   * @param todoService Todo service
   * @param router Angular router
   * @param activatedRoute Angular current active route
   * @param store NgRx store
   */
  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    // Initiate todo form group
    this.todoFormGroup = new FormGroup({
      stateTodoCtrl: new FormControl(false),
      titleTodoCtrl: new FormControl('', Validators.required),
      descriptionTodoCtrl: new FormControl('')
    });
  }

  /**
   * Angular OnInit lifecycle override
   */
  ngOnInit() {
    // Get todo values
    this.todo = this.getTodo();
    this.isTodoExist = this.todo ? true : false;
    console.log(this.isTodoExist);

    // Initiate todo form controls
    this.todoFormGroup.get('stateTodoCtrl').setValue(this.todo.isComplete, {emitEvent: false});
    this.todoFormGroup.get('titleTodoCtrl').setValue(this.todo.title);
    this.todoFormGroup.get('descriptionTodoCtrl').setValue(this.todo.description);

  }

  getTodo(): Todo {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    return this.todoService.getTodoById(id);
  }

  updateTodo() {
    const todoUpdated: Todo = {
      id: this.todo.id,
      title: this.todoFormGroup.get('titleTodoCtrl').value,
      description: this.todoFormGroup.get('descriptionTodoCtrl').value,
      isComplete: this.todo.isComplete
    };

    this.todoService.updateTodo(todoUpdated);
    this.router.navigateByUrl('/list');
  }
}
