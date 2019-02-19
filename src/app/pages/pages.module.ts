import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { PagesComponent } from './pages.component';
import { TodosListComponent } from './todos-list/todos-list.component';

@NgModule({
  declarations: [
    PagesComponent,
    TodosListComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
})
export class PagesModule { }
