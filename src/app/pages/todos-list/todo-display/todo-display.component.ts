import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

import { Todo } from 'src/app/model/todo.interface';
import * as TodoActions from '../../../model/todo.actions';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

/**
 * Display one todo for list todo
 */
@Component({
  selector: 'app-todo',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.scss']
})
export class TodoDisplayComponent implements OnInit {

  /** Todo input to display */
  @Input() todo: Todo;
  /** Boolean value is todo from complete list */
  @Input() isTodosComplete: boolean;

  /** Todo form group */
  todoFormGroup: FormGroup;

  /**
   * Component dependencies
   * @param store NgRx store
   * @param router Angular router
   */
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private todoService: TodoService
  ) {
    // Initiate todo form group
    this.todoFormGroup = new FormGroup({
      stateTodoCtrl: new FormControl(false)
    });
  }

  /**
   * Angular OnInit lifecycle override
   */
  ngOnInit() {
    // Initiate todo state value in checkbox
    this.todoFormGroup.get('stateTodoCtrl').setValue(this.todo.isComplete, {emitEvent: false});

    // Manage todo state value when changes
    this.todoFormGroup.get('stateTodoCtrl').valueChanges.subscribe(state => {
      const action = new TodoActions.ToggleAction(this.todo.id);
      this.store.dispatch(action);
    });


  }

  /**
   * Navigates to the Todo update component on edit button click
   */
  showTodoUpdate(): void {
    this.router.navigateByUrl(`/update/${this.todo.id}`);
  }

  /**
   * Delete the todo on delete button click
   */
  deleteTodo() {
    const id = this.todo.id;
    const action = new TodoActions.DeleteTodoAction(id);
    this.todoService.store.dispatch(action);
  }

}
