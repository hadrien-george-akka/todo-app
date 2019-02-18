import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosListComponent } from './pages/todos-list/todos-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: TodosListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
