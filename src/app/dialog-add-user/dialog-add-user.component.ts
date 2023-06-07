import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, getDoc, getDocs } from '@angular/fire/firestore';
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

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
  }


  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;


    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJson()).then(async (result) => {
      const docSnap = await getDoc(result);
      this.loading = false;
      this.dialogRef.close()
    });

  }
}
