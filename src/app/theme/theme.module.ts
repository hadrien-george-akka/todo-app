import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MyButtonComponent } from './my-button/my-button.component';
import { HeaderComponent } from './header/header.component';
import { ColorPickerComponent } from './header/color-picker/color-picker.component';
import { MatMenuModule } from '@angular/material';


@NgModule({
  declarations: [
    MyButtonComponent,
    HeaderComponent,
    ColorPickerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [
    MyButtonComponent,
    HeaderComponent
  ]
})
export class ThemeModule { }
