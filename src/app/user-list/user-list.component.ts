import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { AddUserComponent } from '../add-user/add-user.component';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(public userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getAll();
    this.userService.getNewUser();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '25%',
    });
    dialogRef.afterClosed().subscribe((val) => {
      if (val === 'Add') {
        this.userService.getAll();
      }
      console.log('The dialog was closed');
    });
  }

  public removeUser(id: number) {
    this.userService.removeUser(id);
  }

  public updateUser(user: any) {
    this.dialog
      .open(AddUserComponent, {
        width: '25%',
        data: user,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Update') {
          this.userService.getAll();
        }
        console.log('The dialog was closed');
      });

    // this.userService.putUser(this.userService.userForm.value);
  }
}
