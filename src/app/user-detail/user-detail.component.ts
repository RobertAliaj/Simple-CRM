import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId!: string;
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }


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
}
