import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppState } from 'src/app/app.reducer';
import * as TodoActions from '../../../model/todo/todo.actions';
import { Todo } from 'src/app/model/model.interface';
import { TodoService } from 'src/app/core/services/todo.service';
import { getTodos, getTodoById } from 'src/app/model/todo/todo.selectors';

/**
 * Todo update component
 */
@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss']
})
export class TodoUpdateComponent implements OnInit {

  /** Id value of todo to update from route param */
  idTodo: number;

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
   */
  constructor(
    public store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // Initiate todo form group
    this.todoFormGroup = new FormGroup({
      titleTodoCtrl: new FormControl('', Validators.required),
      descriptionTodoCtrl: new FormControl('')
    });
  }

  /**
   * Angular OnInit lifecycle override
   */
  ngOnInit() {
    // Get the id of the todo to update
    this.idTodo = this.getTodoId();

    // Get todo object from id value
    this.store.select(getTodoById(this.idTodo)).subscribe(todo => {
      this.todo = todo;
      this.isTodoExist = this.todo ? true : false;
    });

    // Initiate todo form controls
    if (this.isTodoExist) {
      this.todoFormGroup.get('titleTodoCtrl').setValue(this.todo.title);
      this.todoFormGroup.get('descriptionTodoCtrl').setValue(this.todo.description);
    }

  }

  /**
   * Return todo id to update from route param id
   */
  getTodoId(): number {
    return +this.activatedRoute.snapshot.paramMap.get('id');
  }

  /**
   * Update todo with form values on save click
   * Redirect to todos list
   */
  updateTodo() {
    if (this.todoFormGroup.valid) {

      const todoUpdated: Todo = {
        id: this.todo.id,
        title: this.todoFormGroup.get('titleTodoCtrl').value,
        description: this.todoFormGroup.get('descriptionTodoCtrl').value,
        isComplete: this.todo.isComplete
      };

      const action = new TodoActions.UpdateAction(todoUpdated.id, todoUpdated.title, todoUpdated.description);
      this.store.dispatch(action);

      this.navigateToList();
    }
  }

  /**
   * Navigate to the todo list
   */
  navigateToList() {
    this.router.navigateByUrl('/todo/list');
  }

  get titleTodoCtrl() {
    return this.todoFormGroup.get('titleTodoCtrl');
  }
}
