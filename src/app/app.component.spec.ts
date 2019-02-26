import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ColorPickerComponent
      ],
      imports: [
        RouterTestingModule,
        MatMenuModule,
        FlexLayoutModule,
        MatButtonModule,
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
