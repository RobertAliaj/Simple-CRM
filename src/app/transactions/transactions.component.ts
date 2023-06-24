import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { TypedAnimationService } from '../typed-animation.service';
import { Transaction } from 'src/models/transaction.class';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild('typedTarget') typedTarget!: ElementRef;


  allTransactions: any[] = [];
  constructor(
    private firestore: Firestore,
    private animation: TypedAnimationService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getTransactions();
  }


  getTransactions() {
    const collectionRef = collection(this.firestore, 'transactions');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ transactionId: doc.id, ...doc.data() }));
      this.allTransactions = changes;
      this.allTransactions.sort((a, b) => b.timeStamp - a.timeStamp);


      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/transactions') {
            setTimeout(() => {
              this.allTransactions.forEach(transaction => {
                this.updateTransaction(transaction.transactionId, { isNew: false });
              });
            }, 3000);
          }
        }
      });
    });

    setTimeout(() => {
      if (this.allTransactions.length == 0) {
        this.animation.splashScreen(this.typedTarget);
      }
    }, 500);
  }


  async updateTransaction(transactionId: string, update: Partial<Transaction>) {
    const docRef = doc(this.firestore, 'transactions', transactionId);
    await updateDoc(docRef, update);
  }


  async deleteTransaction(transactionId: string) {
    const docRef = doc(this.firestore, 'transactions', transactionId);
    await deleteDoc(docRef).then(() => {
      if (this.allTransactions.length == 0) {
        setTimeout(() => {
          this.animation.splashScreen(this.typedTarget);
        }, 500);
      }
    })
  }
}