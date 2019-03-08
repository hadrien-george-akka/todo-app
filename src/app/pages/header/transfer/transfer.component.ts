import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';

import { snackbarConfig } from 'src/app/core/utils/config.utils';
import { ApplicationState, Todo } from 'src/app/model/model.interface';

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

  /** Object containing all the application values to import from a JSON */
  importValues: ApplicationState;

  /**
   * Component dependencies
   * @param snackbar Material Snackbar message
   * @param dialogRef Reference to a dialog opened with MatDialog service
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

    this.snackbar.open('Copied text', 'X', snackbarConfig);
  }

  /**
   * Close the transfer dialog
   * Give the ApplicationState object to import to the parent component
   */
  importJson() {
    if (this.transferFormGroup.valid) {
      this.dialogRef.close(this.importValues);
    }
  }

  /**
   * Check if the import field is valid
   * Set errors in function of invalid reason
   */
  checkImportValidity() {
    const importText = this.transferFormGroup.get('importCtrl').value;

    if (importText && this.isJsonValid(importText)) {
      this.importValues = JSON.parse(importText);

      if (!this.isTodosValid(this.importValues.todos)) {
        this.transferFormGroup.get('importCtrl').setErrors({todosError: true});
      }

      if (!this.isColorThemeValid(this.importValues.colorTheme)) {
        this.transferFormGroup.get('importCtrl').setErrors({colorThemeError: true});
      }
    } else {
      this.transferFormGroup.get('importCtrl').setErrors({jsonError: true});
    }

  }

  /**
   * Return boolean true if a text is a valid JSON format
   * @param str String text to test if is a valid JSON
   */
  isJsonValid(str: string): boolean {
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
