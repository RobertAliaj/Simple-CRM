import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  allUsers: any = [];
  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private firestore: Firestore,
  ) {
    this.getAllUsers();
  }

  
  /**
   * Get all Users from Firebase
   */
  getAllUsers() {
    const collectionRef = collection(this.firestore, 'users');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.allUsers = changes;
      this.loading = false;
    });
  }

  
  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}