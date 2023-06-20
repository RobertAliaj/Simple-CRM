import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { TypedAnimationService } from '../typed-animation.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild('typedTarget') typedTarget!: ElementRef;


  allTransactions: any[] = [];
  constructor(private firestore: Firestore, private animation: TypedAnimationService) { }


  ngOnInit() {
    this.getTransactions();
  }


  getTransactions() {
    const collectionRef = collection(this.firestore, 'transactions');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ transactionId: doc.id, ...doc.data() }));
      this.allTransactions = changes;
    });

    setTimeout(() => {
      this.animation.splashScreen(this.typedTarget);
    }, 500);
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