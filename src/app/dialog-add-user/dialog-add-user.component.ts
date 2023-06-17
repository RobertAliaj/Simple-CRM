import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, getDoc } from '@angular/fire/firestore';
import { addDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {

  user: User = new User();
  birthDate!: Date;
  loading = false;
  color!: string;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
  }


  getRandomLightColor() {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 30) + 70; // Saturation im Bereich von 70% bis 100%
    let lightness = Math.floor(Math.random() * 30) + 70; // Lightness im Bereich von 70% bis 100%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  changeColor() {
    this.color = this.getRandomLightColor();
  }




  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.user.color = this.color = this.getRandomLightColor();
    this.loading = true;


    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJson()).then(async (result) => {
      const docSnap = await getDoc(result);
      this.loading = false;
      this.dialogRef.close()
    });
  }
}
