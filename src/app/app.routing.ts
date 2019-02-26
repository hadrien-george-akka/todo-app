import { Routes } from '@angular/router';

import { TodosListComponent } from './pages/todos-list/todos-list.component';
import { TodoUpdateComponent } from './pages/todo-update/todo-update.component';


export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TodosListComponent },
  { path: 'update/:id', component: TodoUpdateComponent },
  { path: '**', redirectTo: 'list'}
];

