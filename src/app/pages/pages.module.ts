import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoDisplayComponent } from './todos-list/todo-display/todo-display.component';


@NgModule({
  declarations: [
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
})
export class PagesModule { }
