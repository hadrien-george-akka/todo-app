import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoDisplayComponent } from './todo-display/todo-display.component';

@NgModule({
  declarations: [
    PagesComponent,
    TodosListComponent,
    TodoDisplayComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class PagesModule { }
