import { Component, OnInit } from '@angular/core';
import { ColorPickerService } from '../../core/services/color-picker.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  constructor(
    private colorPickerService: ColorPickerService
  ) { }

  ngOnInit() {
  }

  setThemeColor(color: string) {
    this.colorPickerService.setColorClass(`todo-app-theme-${color}`);

  }

}
