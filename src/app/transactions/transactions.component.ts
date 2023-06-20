import { OnInit, Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Transaction } from 'src/models/transaction.class';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { BehaviorSubject } from 'rxjs';
import { Route } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  allTransactions: any[] = [];
  constructor(private firestore: Firestore) { }


  ngOnInit() {
    this.getTransactions();
  }


  getTransactions() {
    const collectionRef = collection(this.firestore, 'transactions');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ transactionId: doc.id, ...doc.data() }));
      this.allTransactions = changes;
    });
  }


  async deleteTransaction(transactionId: string) {
    const docRef = doc(this.firestore, 'transactions', transactionId);
    await deleteDoc(docRef).then(() => {
    })
  }
  
}