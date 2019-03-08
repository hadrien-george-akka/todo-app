import { Routes } from '@angular/router';

import { TodosListComponent } from './pages/todo/todos-list/todos-list.component';
import { TodoUpdateComponent } from './pages/todo/todo-update/todo-update.component';
import { TodoComponent } from './pages/todo/todo.component';
import { PagesComponent } from './pages/pages.component';


export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'todo',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'todo',
  //   component: TodoComponent,
  //   children: [
  //     {
  //       path: 'list',
  //       component: TodosListComponent
  //     },
  //     {
  //       path: 'update/:id',
  //       component: TodoUpdateComponent
  //     },
  //     {
  //       path: '**',
  //       redirectTo: 'list'
  //     }
  //   ]
  // },
  // {
  //   path: '**',
  //   redirectTo: 'todo'
  // }
  {
    path: 'todo',
    component: PagesComponent,
    children: [
      {
        path: '',
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
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'todo'
  }

];

