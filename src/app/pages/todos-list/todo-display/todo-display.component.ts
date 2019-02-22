import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

import { Todo } from 'src/app/model/todo.interface';
import * as TodoActions from '../../../model/todo.actions';
import { Router } from '@angular/router';

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
   */
  constructor(
    private store: Store<AppState>,
    private router: Router
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
   * Navigates to the Todo detail component
   */
  displayTodoDetail() {
    this.router.navigateByUrl(`/detail/${this.todo.id}`);
  }

}