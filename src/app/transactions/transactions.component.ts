import { AfterContentInit, Component, OnInit, AfterViewInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Transaction } from 'src/models/transaction.class';
import { collection, onSnapshot } from "firebase/firestore";


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements AfterViewInit {

  transactions: Transaction[] = [];

  constructor(private firestore: Firestore) { }

  ngAfterViewInit() {
    // this.getUsers();
  }

  getUsers() {
    const usersCollectionRef = collection(this.firestore, 'transactions');
    const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
      const transactions: any = [];
      querySnapshot.forEach((doc) => {
        transactions.push(new Transaction(doc.data()));
      });
      this.transactions = transactions;
    });
  }
}
