import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import * as TodoActions from '../../model/todo/todo.actions';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(
    public store: Store<AppState>,
    private todoService: TodoService
    ) { }

  ngOnInit() {
    this.store.dispatch(new TodoActions.PopulateTodosAction(this.todoService.getTodoListFromLocalStorage()));
    this.store.dispatch(new TodoActions.SortTodoAction());
  }

}
