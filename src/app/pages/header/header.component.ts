import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { TransferComponent } from './transfer/transfer.component';
import { ColorPickerService } from 'src/app/core/services/color-picker.service';
import { ApplicationState } from 'src/app/model/model.interface';
import * as TodoActions from '../../model/todo/todo.actions';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private colorPickerService: ColorPickerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openTransferDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';

    const dialogRef = this.dialog.open(TransferComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value: ApplicationState) => {
      if (value) {
        this.colorPickerService.setColorClass(value.colorTheme);
        this.todoService.store.dispatch(new TodoActions.PopulateTodosAction(value.todos));
      }
    });
  }

}
