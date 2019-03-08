import { Component, OnInit } from '@angular/core';
import { ColorPickerService } from '../../../core/services/color-picker.service';
import { Favicons } from '../../../core/services/color-picker.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  /** Prefix of theme css class containing each theme */
  prefixClass: string;

  /** Default theme css class */
  defaultClass: string;

  /**
   * Component dependencies
   * @param colorPickerService Color picker service
   * @param favicons Favicon class
   */
  constructor(
    private colorPickerService: ColorPickerService,
    private favicons: Favicons
  ) {
    this.prefixClass = this.colorPickerService.prefixClass;
    this.defaultClass = this.colorPickerService.defaultClass;
  }

  /**
   * Angular OnInit lifecyle override
   */
  ngOnInit() {
    const storageClass = localStorage.getItem('color-picker');

    if (storageClass) {
      const classTheme = this.prefixClass + storageClass;
      this.colorPickerService.addClassToOverlayContainer(classTheme);
      this.colorPickerService.colorClass$.next(classTheme);
      this.favicons.activate(storageClass);
    } else {
      this.colorPickerService.addClassToOverlayContainer(this.prefixClass + this.defaultClass);
      this.favicons.reset();
    }
  }

  /**
   * Set the app theme color from user selection
   * @param color Theme color to apply
   */
  setThemeColor(color: string) {
    this.colorPickerService.setColorClass(color);
    this.favicons.activate(color);

  }

}
