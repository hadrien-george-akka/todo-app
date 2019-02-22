import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/model/todo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { getTodos } from 'src/app/model/todo.selectors';

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
   * @param router Angular router
   * @param activatedRoute Angular current active route
   */
  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  /**
   * Angular OnInit lifecycle override
   */
  ngOnInit() {

    this.todo = this.getTodo();
    this.isTodoExist = this.todo ? true : false;

  }

  /**
   * Get todo to display from route param id
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
   * Navigate to the todo list
   */
  navigateToList() {
    this.router.navigateByUrl('/list');
  }

}
