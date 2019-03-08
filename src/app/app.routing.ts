import { Routes } from '@angular/router';

import { TodosListComponent } from './pages/todo/todos-list/todos-list.component';
import { TodoUpdateComponent } from './pages/todo/todo-update/todo-update.component';
import { TodoComponent } from './pages/todo/todo.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo'
  },
  {
    path: 'todo',
    component: TodoComponent,
    children: [
      {
        path: 'list',
        component: TodosListComponent
      },
      {
        path: 'update/:id',
        component: TodoUpdateComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'todo'
  }

];

