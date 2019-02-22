import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/model/todo.interface';
import { ActivatedRoute } from '@angular/router';

/**
 * Todo detail component
 */
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  /** Todo object to display details */
  todo: Todo;

  /** Boolean values does todo with route param id exist */
  isTodoExist = true;

  /** Error message to display if isTodoExist is false */
  errorTodoNotExist = 'This TODO does not exist';

  /**
   * Component dependencies
   * @param todoService Todo service
   * @param route Angular current active route
   */
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) { }

  /**
   * Angular OnInit lifecycle override
   */
  ngOnInit() {

    this.todo = this.getTodo();
    this.isTodoExist = this.todo ? true : false;
    console.log(this.isTodoExist);

  }

  getTodo(): Todo {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.todoService.getTodoById(id);
  }
}
