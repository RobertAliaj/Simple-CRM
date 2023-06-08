import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {

  userId!: string;
  user!: User;
  loading = false;  

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore){}

  async saveUser() {
    this.loading = true;
    const userDoc = doc(this.firestore, 'users', this.userId);
    updateDoc(userDoc, this.user.toJson()).then(() => {
      this.loading = false;
      this.dialogRef.close()
    });
  }

  
  // save(){
  //   this.firestore.collection('users').doc(this.userId).valueChanges()
  // }

}
