import { UserService } from './../services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  actionBtn: string = 'Add';

  constructor(
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.userService.userForm.controls['first_name'].setValue(
        this.editData.first_name
      );
      this.userService.userForm.controls['last_name'].setValue(
        this.editData.last_name
      );
      this.userService.userForm.controls['email'].setValue(this.editData.email);
      this.userService.userForm.controls['avatar'].setValue(
        this.editData.avatar
      );
      this.userService.userForm.controls['id'].setValue(this.editData.id);
    }
  }

  addUser() {
    console.log(this.userService.userForm.value);
    if (!this.editData) {
      if (this.userService.userForm.valid) {
        this.userService.postUser(this.userService.userForm.value).subscribe({
          next: (res) => {
            alert('User added successfully');
            this.userService.userForm.reset({
              avatar: 'https://i.pravatar.cc/150',
            });
            this.dialogRef.close('Update');
          },
          error: () => {
            alert('Error while adding the user!!');
          },
        });
        this.userService.getNewUser();
      }
    } else {
      this.updateUser();
    }
  }

  updateUser() {
    this.userService
      .putUser(this.userService.userForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('User updated successfully');
          this.userService.userForm.reset({
            avatar: 'https://i.pravatar.cc/150',
          });
          this.dialogRef.close('Add');
        },
        error: () => {
          alert('Error while updating the user!!');
        },
      });
  }
}
