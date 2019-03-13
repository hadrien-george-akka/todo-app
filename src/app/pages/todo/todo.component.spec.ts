import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from '../header/header.component';
import { TransferComponent } from '../header/transfer/transfer.component';
import { ColorPickerComponent } from '../header/color-picker/color-picker.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule, MatButtonModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/app/app.reducer';
import { ColorPickerService, Favicons } from 'src/app/core/services/color-picker.service';
import { TodoService } from 'src/app/core/services/todo.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent,
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
        TodoService,
        Favicons
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
