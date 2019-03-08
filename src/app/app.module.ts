import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ThemeModule } from './theme/theme.module';
import { rootReducer } from './app.reducer';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BROWSER_FAVICONS_CONFIG } from './core/services/color-picker.service';
import { BrowserFavicons } from './core/services/color-picker.service';
import { Favicons } from './core/services/color-picker.service';

import { routes } from './app.routing';
import { TodoService } from './core/services/todo.service';
import { ColorPickerService } from './core/services/color-picker.service';
import { UpdateLocalStorageEffects } from './model/effects/update-local-storage.effects';
import { SortTodosEffects } from './model/effects/sort-by-id.effects';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PagesModule,
    ThemeModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
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
                  type: 'image/png',
                  href: './assets/greenlight.png',
                  isDefault: true
              },
              redlight: {
                  type: 'image/png',
                  href: './assets/redlight.png'
              },
              reddark: {
                type: 'image/png',
                href: './assets/reddark.png'
              },
              yellow: {
                type: 'image/png',
                href: './assets/yellow.png'
              },
              orange: {
                type: 'image/png',
                href: './assets/orange.png'
              },
              greendark: {
                type: 'image/png',
                href: './assets/greendark.png'
              },
              cyanlight: {
                type: 'image/png',
                href: './assets/cyanlight.png'
              },
              cyandark: {
                type: 'image/png',
                href: './assets/cyandark.png'
              },
              bluelight: {
                type: 'image/png',
                href: './assets/bluelight.png'
              },
              bluedark: {
                type: 'image/png',
                href: './assets/bluedark.png'
              },
              purplelight: {
                type: 'image/png',
                href: './assets/purplelight.png'
              },
              purpledark: {
                type: 'image/png',
                href: './assets/purpledark.png'
              },
              grey: {
                type: 'image/png',
                href: './assets/grey.png'
              },
              black: {
                type: 'image/png',
                href: './assets/black.png'
              },
          },
          cacheBusting: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
