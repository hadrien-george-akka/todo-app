import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { TodosListComponent } from './todos-list/todos-list.component';

@NgModule({
  declarations: [
    PagesComponent,
    TodosListComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
})
export class PagesModule { }
