import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Transaction } from 'src/models/transaction.class';
import { collection, getDocs, onSnapshot } from "firebase/firestore";


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private firestore: Firestore) { }

  ngOnInit() {
    this.getUsers();
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
