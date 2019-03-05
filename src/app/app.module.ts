import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ThemeModule } from './theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './app.reducer';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TodoService } from './core/services/todo.service';
import { ColorPickerService } from './core/services/color-picker.service';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { EffectsModule } from '@ngrx/effects';
import { UpdateLocalStorageEffects } from './model/effects/update-local-storage.effects';

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PagesModule,
    ThemeModule,
    AppRoutingModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([UpdateLocalStorageEffects])
  ],
  providers: [
    TodoService,
    ColorPickerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
