import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { doc, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent implements OnInit {

  userId!: string;
  user!: User;
  loading = false;
  userForm!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      street: [this.user.street, Validators.required],
      zipCode: [this.user.zipCode, Validators.required],
      city: [this.user.city, Validators.required]
    });
  }

  async saveUser() {
    if (this.userForm.valid) {
      this.userForm.disable();
      this.loading = true;
      this.user.street = this.userForm.get('street')?.value;
      this.user.zipCode = this.userForm.get('zipCode')?.value;
      this.user.city = this.userForm.get('city')?.value;

      const userDoc = doc(this.firestore, 'users', this.userId);
      await updateDoc(userDoc, this.user.toJson());
      this.loading = false;
      this.userForm.enable();
      this.dialogRef.close();
    }
  }
}
