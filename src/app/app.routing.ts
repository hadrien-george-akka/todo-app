import { Routes } from '@angular/router';

import { TodosListComponent } from './pages/todos-list/todos-list.component';
import { TodoUpdateComponent } from './pages/todo-update/todo-update.component';
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
    path: '',
    component: PagesComponent,
    children: [
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
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'todo'
  }

];

