import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ThemeModule } from './theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { rootReducer } from './app.reducer';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BROWSER_FAVICONS_CONFIG } from './core/services/color-picker.service';
import { BrowserFavicons } from './core/services/color-picker.service';
import { Favicons } from './core/services/color-picker.service';

import { TodoService } from './core/services/todo.service';
import { ColorPickerService } from './core/services/color-picker.service';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { UpdateLocalStorageEffects } from './model/effects/update-local-storage.effects';
import { SortTodosEffects } from './model/effects/sort-by-id.effects';

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
    EffectsModule.forRoot([
      UpdateLocalStorageEffects,
      SortTodosEffects
    ])
  ],
  providers: [
    TodoService,
    ColorPickerService,
    {
      provide: Favicons,
      useClass: BrowserFavicons
    },
    {
      provide: BROWSER_FAVICONS_CONFIG,
      useValue: {
          icons: {
              greenlight: {
                  type: 'image/x-icon',
                  href: './assets/greenlight.ico',
                  isDefault: true
              },
              redlight: {
                  type: 'image/x-icon',
                  href: './assets/redlight.ico'
              },
              reddark: {
                type: 'image/x-icon',
                href: './assets/reddark.ico'
              },
              yellow: {
                type: 'image/x-icon',
                href: './assets/yellow.ico'
              },
              orange: {
                type: 'image/x-icon',
                href: './assets/orange.ico'
              },
              greendark: {
                type: 'image/x-icon',
                href: './assets/greendark.ico'
              },
              cyanlight: {
                type: 'image/x-icon',
                href: './assets/cyanlight.ico'
              },
              cyandark: {
                type: 'image/x-icon',
                href: './assets/cyandark.ico'
              },
              bluelight: {
                type: 'image/x-icon',
                href: './assets/bluelight.ico'
              },
              bluedark: {
                type: 'image/x-icon',
                href: './assets/bluedark.ico'
              },
              purplelight: {
                type: 'image/x-icon',
                href: './assets/purplelight.ico'
              },
              purpledark: {
                type: 'image/x-icon',
                href: './assets/purpledark.ico'
              },
              grey: {
                type: 'image/x-icon',
                href: './assets/grey.ico'
              },
              black: {
                type: 'image/x-icon',
                href: './assets/black.ico'
              },
          },
          cacheBusting: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
