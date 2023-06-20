import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddTransactionComponent } from '../dialog-add-transaction/dialog-add-transaction.component';
import { GenderService } from '../gender.service';
import { Gender } from '../gender';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})


export class UserDetailComponent {
  userId!: string;
  user: User = new User();
  birthDate!: Date;
  avatar!: string;
  loading: boolean = true;


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog,
    private genderService: GenderService
  ) {
  }


  ngOnInit() {
    this.route.params.subscribe(params =>
      this.userId = params['id']
    )
    this.getUser();
  }

  async deleteUser() {
    const userRef = doc(this.firestore, 'users', this.userId);
    await deleteDoc(userRef).then(() => {
      this.router.navigate(['/user']);
    })
  }


  async getUser() {
    const docRef = doc(this.firestore, 'users', this.userId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      this.user = new User(docSnap.data());


      this.genderService.getGender(this.user.firstName).subscribe((data: Gender) => {
        const gender = data.gender;
        this.avatar = gender === 'male' ? 'man' : 'women';
        this.loading = false;
      });
    });
  }


  editAdress() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  }


  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  }


  openDialog(): void {
    const dialog = this.dialog.open(DialogAddTransactionComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
  }
}
