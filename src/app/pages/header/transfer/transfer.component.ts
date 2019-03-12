import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';

import { TodoService } from 'src/app/core/services/todo.service';
import { snackbarConfig } from 'src/app/core/utils/config.utils';
import { ApplicationState, Todo } from 'src/app/model/model.interface';
import { ColorPickerService } from 'src/app/core/services/color-picker.service';

/**
 * Transfer component in angular material dialog
 */
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  /** Transfer form group */
  transferFormGroup: FormGroup;

  /** Data values in JSON to export */
  exportData: string;

  /**
   * Component dependencies
   */
  constructor(
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<TransferComponent>
  ) {
    this.transferFormGroup = new FormGroup({
      importCtrl: new FormControl('', Validators.required),
      exportCtrl: new FormControl('')
    });
  }

  ngOnInit() {
    this.exportData = this.generateJson();
    this.transferFormGroup.get('exportCtrl').setValue(this.exportData);
  }

  /**
   * Generate JSON from local storage values
   */
  generateJson(): string {
    return `{"todos": ${localStorage.getItem('todos')},"colorTheme": "${localStorage.getItem('colorTheme')}"}`;
  }

  /**
   * Copy to clipboard the export JSON inside text-area
   * @param inputElement Html element to copy text
   */
  copyExportText(inputElement: any): void {
    inputElement.select();
    document.execCommand('copy');

    console.log(this.transferFormGroup);

    this.snackbar.open('Copied text', 'X', snackbarConfig);
  }

  importJson() {
    const jsonText = this.transferFormGroup.get('importCtrl').value;
    if (jsonText && this.isJson(jsonText)) {
      const importValues: ApplicationState = JSON.parse(jsonText);

      if (this.isApplicationStateValid(importValues)) {
        this.dialogRef.close(importValues);
      }
    }
  }

  checkImportValidity() {
    const importText = this.transferFormGroup.get('importCtrl').value;

    if (importText && this.isJson(importText)) {
      const importValues: ApplicationState = JSON.parse(importText);

      if (!this.isTodosValid(importValues.todos)) {
        this.transferFormGroup.get('importCtrl').setErrors({todosError: true});
      }

      if (!this.isColorThemeValid(importValues.colorTheme)) {
        this.transferFormGroup.get('importCtrl').setErrors({colorThemeError: true});
      }
    } else {
      this.transferFormGroup.get('importCtrl').setErrors({jsonError: true});
    }

  }

  /**
   * Return boolean true if a text is JSON format
   * @param str String text to test if is a JSON
   */
  isJson(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Check if the application state object contains valid todos and color theme
   * @param app Application state object
   */
  isApplicationStateValid(app: ApplicationState) {
    if (!this.isTodosValid(app.todos)) {
      return false;
    }
    if (!this.isColorThemeValid(app.colorTheme)) {
      return false;
    }
    return true;

  }

  /**
   * Check if a list of todos is valid
   * check if it contains an id or a title
   * @param todos Array of todo objects
   */
  isTodosValid(todos: Todo[]): boolean {
    if (todos) {
      let isValid = true;
      for (let todo of todos) {
        if (!todo.id) { isValid = false; }
        if (!todo.title) { isValid = false; }
      }
      return isValid;
    } else {
      return false;
    }
  }

  /**
   * Check if color theme is valid value
   * @param colorTheme Color theme string
   */
  isColorThemeValid(colorTheme: string): boolean {
    if (colorTheme) {
      switch (colorTheme) {
        case 'redlight':
        case 'yellow':
        case 'greenlight':
        case 'cyanlight':
        case 'bluelight':
        case 'purplelight':
        case 'grey':
        case 'reddark':
        case 'orange':
        case 'greendark':
        case 'cyandark':
        case 'bluedark':
        case 'purpledark':
        case 'black':
          return true;
        default:
          return false;
      }
    } else {
      return false;
    }
  }

  get importCtrl() {
    return this.transferFormGroup.get('importCtrl');
  }

}
