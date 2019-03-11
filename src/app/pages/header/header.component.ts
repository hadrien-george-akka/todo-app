import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { TransferComponent } from './transfer/transfer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openTransferDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';

    const dialogRef = this.dialog.open(TransferComponent, dialogConfig);
  }

}
