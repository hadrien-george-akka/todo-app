import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState } from 'src/app/app.reducer';
import { Todo } from 'src/app/model/model.interface';
import * as TodoActions from '../../../../model/todo/todo.actions';

/**
 * Display one todo for list todo
 */
@Component({
  selector: 'app-todo',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.scss']
})
export class TodoDisplayComponent implements OnInit {

  /** Boolean is the user screen size of mobile */
  public isMobile: boolean;

  /** Todo input to display */
  @Input() todo: Todo;
  /** Boolean value is todo from complete list */
  @Input() isTodosComplete: boolean;

  /** Todo form group */
  todoFormGroup: FormGroup;

  /**
   * Component dependencies
   * @param router Angular router
   * @param todoService Todo service
   */
  constructor(
    public store: Store<AppState>,
    private router: Router,
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
    this.isMobile = window.innerWidth < 600 ? true : false;

    // Initiate todo state value in checkbox
    this.todoFormGroup.get('stateTodoCtrl').setValue(this.todo.isComplete, {emitEvent: false});

    // Manage todo state value when changes
    this.todoFormGroup.get('stateTodoCtrl').valueChanges.subscribe(state => {
      const action = new TodoActions.ToggleAction(this.todo.id);
      this.store.dispatch(action);
    });
  }

  /**
   * Keep boolean isMobile updated when the windows resize
   * @param event Resize windows event
   */
  @HostListener('window:resize', ['$event']) onresize(event) {
    this.isMobile = window.innerWidth < 600 ? true : false;
  }

  /**
   * Navigates to the Todo update component on edit button click
   */
  showTodoUpdate(): void {
    this.router.navigateByUrl(`/todo/update/${this.todo.id}`);
  }

  /**
   * Delete the todo on delete button click
   */
  deleteTodo() {
    const id = this.todo.id;
    const action = new TodoActions.DeleteTodoAction(id);
    this.store.dispatch(action);
  }

}
