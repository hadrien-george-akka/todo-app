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
import { MatInputModule, MatExpansionModule, MatMenuModule, MatDialogModule } from '@angular/material';

import { ThemeModule } from '../theme/theme.module';
import { TodoAddComponent } from './todo/todos-list/todo-add/todo-add.component';
import { TodosListComponent } from './todo/todos-list/todos-list.component';
import { TodoDisplayComponent } from './todo/todos-list/todo-display/todo-display.component';
import { TodoUpdateComponent } from './todo/todo-update/todo-update.component';
import { TodoComponent } from './todo/todo.component';
import { HeaderComponent } from './header/header.component';
import { ColorPickerComponent } from './header/color-picker/color-picker.component';
import { TransferComponent } from './header/transfer/transfer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ColorPickerComponent,
    TransferComponent,
    TodoAddComponent,
    TodosListComponent,
    TodoDisplayComponent,
    TodoUpdateComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FlexLayoutModule,
    ThemeModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [
    TransferComponent
  ]
})
export class PagesModule { }
