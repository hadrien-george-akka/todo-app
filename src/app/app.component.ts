import { Component } from '@angular/core';
import { ColorPickerService } from './core/services/color-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** App title */
  title = 'todo-app';

  /** Theme css class to apply */
  themeClass;

  constructor(
    private colorPicker: ColorPickerService
  ) {
    this.themeClass = this.colorPicker.getColorClass();
  }
}
