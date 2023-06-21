import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { doc, updateDoc } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user!: User;
  loading = false;
  birthDate!: Date;
  userId!: string;
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      birthDate: [this.user.birthDate, Validators.required],
    });
  }


  async saveUser() {
    if (this.userForm.valid) {

      this.user.firstName = this.userForm.get('firstName')?.value;
      this.user.lastName = this.userForm.get('lastName')?.value;
      this.user.email = this.userForm.get('email')?.value;
      this.user.birthDate = this.userForm.get('birthDate')?.value;

      this.loading = true;
      this.userForm.disable();
      const userDoc = doc(this.firestore, 'users', this.userId);
      updateDoc(userDoc, this.user.toJson()).then(() => {
        this.userForm.enable();
        this.loading = false;
        this.dialogRef.close()
      });
    }
  }
}
