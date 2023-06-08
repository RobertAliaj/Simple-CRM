import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId!: string;
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }


  ngOnInit() {
    this.route.params.subscribe(params =>
      this.userId = params['id']
    )
    this.getUser();
  }


  getUser() {
    let result;
    const docRef = doc(this.firestore, 'users', this.userId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      this.user = new User(docSnap.data());
    });

    // ... Später, wenn ich den Listener nicht mehr brauche
    // unsubscribe();
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = this.user;
  }


  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.user;
  }
}
