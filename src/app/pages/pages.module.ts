import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatExpansionModule } from '@angular/material';

import { ThemeModule } from '../theme/theme.module';
import { TodoAddComponent } from './todos-list/todo-add/todo-add.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoDisplayComponent } from './todos-list/todo-display/todo-display.component';
import { TodoUpdateComponent } from './todo-update/todo-update.component';
import { TodoComponent } from './todo/todo.component';


@NgModule({
  declarations: [
    TodoAddComponent,
    TodosListComponent,
    TodoDisplayComponent,
    TodoUpdateComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FlexLayoutModule,
    ThemeModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
})
export class PagesModule { }
