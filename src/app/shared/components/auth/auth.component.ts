import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AuthService } from '../../../services/auth.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'dr-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(public authService: AuthService, private _dialog: MdDialog) {}

  logout() {
     this.authService.logout();
  }

  showPanel() {
    const dialogRef = this._dialog.open(AuthDialogComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

}
