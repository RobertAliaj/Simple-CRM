import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { collection, onSnapshot } from 'firebase/firestore';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  allUsers: any = [];
  loading: boolean = true;
  currentLoggedUser!: any;
  filteredUsers: any = [];

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
      this.filteredUsers = this.allUsers;
    });
  }


  filterByNames(searchValue: string) {
    this.filteredUsers = this.allUsers.filter((user: { firstName: string; city: string; }) =>
      user?.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user?.city.toLowerCase().includes(searchValue.toLowerCase()));
  }
}