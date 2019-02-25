import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosListComponent } from './pages/todos-list/todos-list.component';
import { TodoUpdateComponent } from './pages/todo-update/todo-update.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TodosListComponent },
  { path: 'update/:id', component: TodoUpdateComponent },
  { path: '**', redirectTo: 'list'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
