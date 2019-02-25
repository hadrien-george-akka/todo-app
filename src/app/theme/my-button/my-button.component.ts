import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Button } from 'protractor';

/**
 * Add Todo component
 */
@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent {

  /** Text placeholder to put inside the button */
  @Input() text: string;

  /** On button click event emitter */
  @Output() click: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
   }

  /**
   * Emit output value true when user clicks on button
   */
  onClickButton(button: any) {
    if (button.action) {
      this.click.emit(button.action);
    }
  }

}
