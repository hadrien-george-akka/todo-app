import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { TodoService } from 'src/app/core/services/todo.service';
import { snackbarConfig } from 'src/app/core/utils/config.utils';

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
    private todoService: TodoService,
    private snackbar: MatSnackBar
  ) {
    this.transferFormGroup = new FormGroup({
      importCtrl: new FormControl(''),
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
    const json = `{"todos": ${localStorage.getItem('todos')},"color-picker": "${localStorage.getItem('color-picker')}"}`;
    return json;
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

}
