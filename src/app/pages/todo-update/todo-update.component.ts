import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/model/todo.interface';
import * as TodoActions from './../../model/todo.actions';
import { getTodos } from 'src/app/model/todo.selectors';

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
   */
  constructor(
    private todoService: TodoService,
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
    // Get todo values
    this.todo = this.getTodo();
    this.isTodoExist = this.todo ? true : false;

    // Initiate todo form controls
    if (this.isTodoExist) {
      this.todoFormGroup.get('titleTodoCtrl').setValue(this.todo.title);
      this.todoFormGroup.get('descriptionTodoCtrl').setValue(this.todo.description);
    }

  }

  /**
   * Get todo to update from route param id
   */
  getTodo(): Todo {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    let todoToUpdate: Todo;

    this.todoService.store.select(getTodos).subscribe(todos => {
      todoToUpdate = this.todoService.getTodoById(todos, id);
    });

    return todoToUpdate;
  }

  /**
   * Update todo with form values on save click
   * Redirect to todos list
   */
  updateTodo() {
    const todoUpdated: Todo = {
      id: this.todo.id,
      title: this.todoFormGroup.get('titleTodoCtrl').value,
      description: this.todoFormGroup.get('descriptionTodoCtrl').value,
      isComplete: this.todo.isComplete
    };

    const action = new TodoActions.UpdateAction(todoUpdated.id, todoUpdated.title, todoUpdated.description);
    this.todoService.store.dispatch(action);

    this.navigateToList();
  }

  /**
   * Navigate to the todo list
   */
  navigateToList() {
    this.router.navigateByUrl('/list');
  }
}
