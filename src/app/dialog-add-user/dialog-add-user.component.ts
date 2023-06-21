import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, getDoc } from '@angular/fire/firestore';
import { addDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user: User = new User();
  birthDate!: Date;
  color!: string;
  userForm!: FormGroup;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private fb: FormBuilder
  ) {
  }


  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      birthDate: [this.user.birthDate, Validators.required],
      street: [this.user.street, Validators.required],
      zipCode: [this.user.zipCode, [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: [this.user.city, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }


  getRandomLightColor() {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 20) + 73; // Sättigung im Bereich von 80% bis 100%
    let lightness = Math.floor(Math.random() * 30) + 63; // Helligkeit im Bereich von 40% bis 70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


  changeColor() {
    this.color = this.getRandomLightColor();
  }


  async saveUser() {
    if (this.userForm.valid) {

      // this.user.birthDate = this.birthDate.getTime();
      this.user.color = this.color = this.getRandomLightColor();
      this.userForm.disable();

      this.user.firstName = this.userForm.get('firstName')?.value;
      this.user.lastName = this.userForm.get('lastName')?.value;
      this.user.street = this.userForm.get('street')?.value;
      this.user.zipCode = this.userForm.get('zipCode')?.value;
      this.user.city = this.userForm.get('city')?.value;
      this.user.email = this.userForm.get('email')?.value;
      this.user.birthDate = this.userForm.get('birthDate')?.value;


      const usersCollection = collection(this.firestore, 'users');
      addDoc(usersCollection, this.user.toJson()).then(async (result) => {
        const docSnap = await getDoc(result);
        this.userForm.enable();
        this.dialogRef.close();
      });
    }
  }
}
