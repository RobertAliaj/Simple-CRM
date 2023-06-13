import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { doc, updateDoc } from 'firebase/firestore';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  user!: User;
  loading = false;
  birthDate!: Date;
  userId!: string;


  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) { }

  // ngOnInit() {
  //   let birthDateNumber = this.user.birthDate; // angenommen, dies ist die Anzahl der Millisekunden seit der Unix-Epoche
  //   let birthDate = new Date(birthDateNumber); // konvertiert die Anzahl der Millisekunden in ein Datum
  //   console.log(birthDate); // gibt das Datum aus
  // }


  async saveUser() {
    this.loading = true;
    const userDoc = doc(this.firestore, 'users', this.userId);
    updateDoc(userDoc, this.user.toJson()).then(() => {
      this.loading = false;
      this.dialogRef.close()
    });
  }
}
