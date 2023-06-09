import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { User } from 'src/models/user.class';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc, where, query } from 'firebase/firestore';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  allUsers: any = [];
  loading: boolean = true;
  currentLoggedUser!: any;

  constructor(
    public dialog: MatDialog,
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.getAllUsers();
  }

  
  /**
   * Get all Users from Firebase
   */
  async getAllUsers() {
    this.currentLoggedUser = await this.authService.getCurrentLoggedInEmail();
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