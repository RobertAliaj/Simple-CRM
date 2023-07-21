import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
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
  userForm!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialogEditAdressComponent>,
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.userForm = this.fb.group({
      street: [this.user.street, Validators.required],
      zipCode: [this.user.zipCode, [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: [this.user.city, Validators.required]
    });
  }


  updateAdressDetails() {
    if (this.userForm.valid) {
      this.getValuesFromInput();
      this.userForm.disable();
      this.saveAdress();
    }
  }


  getValuesFromInput() {
    this.user.street = this.userForm.get('street')?.value;
    this.user.zipCode = this.userForm.get('zipCode')?.value;
    this.user.city = this.userForm.get('city')?.value;
  }


  saveAdress() {
    const userDoc = doc(this.firestore, 'users', this.userId);
    updateDoc(userDoc, this.user.toJson());
    this.userForm.enable();
    this.dialogRef.close();
  }

}
