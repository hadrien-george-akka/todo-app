import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { TodoService } from 'src/app/core/services/todo.service';

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

  /**
   * Component dependencies
   */
  constructor(
    private todoService: TodoService
  ) {
    this.transferFormGroup = new FormGroup({
      importCtrl: new FormControl(''),
      exportCtrl: new FormControl('')
    });
  }

  ngOnInit() {

  }

}
