import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ColorPickerComponent } from './pages/header/color-picker/color-picker.component';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { MatButtonModule, MatMenuModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './pages/header/header.component';
import { TransferComponent } from './pages/header/transfer/transfer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerService, Favicons } from './core/services/color-picker.service';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './app.reducer';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        TransferComponent,
        ColorPickerComponent
      ],
      imports: [
        RouterTestingModule,
        MatMenuModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDialogModule,
        StoreModule.forRoot(rootReducer)
      ],
      providers: [
        ColorPickerService,
        Favicons
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('todo-app');
  });
});
