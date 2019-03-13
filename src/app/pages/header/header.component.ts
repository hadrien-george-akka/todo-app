import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import * as TodoActions from '../../model/todo/todo.actions';
import { TransferComponent } from './transfer/transfer.component';
import { ColorPickerService } from 'src/app/core/services/color-picker.service';
import { ApplicationState } from 'src/app/model/model.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public store: Store<AppState>,
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
        this.store.dispatch(new TodoActions.PopulateTodosAction(value.todos));
      }
    });
  }

}
