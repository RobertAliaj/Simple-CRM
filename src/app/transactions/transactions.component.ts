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


  /**
  * Fetches all transaction data from the Firestore database and assigns it to the `allTransactions` array.
  * Listens in real time for any changes in the 'transactions' collection in Firestore.
   */
  getTransactions() {
    const collectionRef = collection(this.firestore, 'transactions');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ transactionId: doc.id, ...doc.data() }));
      this.allTransactions = changes;
      this.allTransactions.sort((a, b) => b.timeStamp - a.timeStamp);
      this.highlightNewTransactions();
    });

    this.playTypingAnimation();
  }


  /**
  * Listens for NavigationEnd events from the Router.
  * If the URL of the NavigationEnd event is '/transactions', the method waits for 3 seconds and then sets the 
  * 'isNew' property of all transactions to false by calling `updateTransaction` for each transaction in `allTransactions`.
  */
  highlightNewTransactions() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/transactions') {
          setTimeout(() => {
            this.allTransactions.forEach(transaction => {
              this.updateTransaction(transaction.transactionId, { isNew: false });
            });
          }, 1500);
        }
      }
    });
  }


  /**
   * Updates the document with the specified `transactionId` in the 'transactions' collection in Firestore.
   * The document is updated with the properties and values specified in the `update` parameter.
   * 
   * @param transactionId - The id of the transaction document to update.
   * @param update - An object containing the properties and values to update in the transaction document.
   */
  async updateTransaction(transactionId: string, update: Partial<Transaction>) {
    const docRef = doc(this.firestore, 'transactions', transactionId);
    await updateDoc(docRef, update);
  }


  /**
   * Deletes the document with the specified `transactionId` from the 'transactions' collection in Firestore.
   * 
   * @param transactionId - The id of the transaction document to delete.
   */
  async deleteTransaction(transactionId: string) {
    const docRef = doc(this.firestore, 'transactions', transactionId);
    await deleteDoc(docRef).then(() => {
      this.playTypingAnimation();
    })
  }


  /**
   * If `allTransactions` is empty, triggers the typing animation on `typedTarget` after waiting for 500ms.
   */
  playTypingAnimation() {
    setTimeout(() => {
      if (this.allTransactions.length == 0) {
        this.animation.typeAnimation(this.typedTarget);
      }
    }, 500);
  }
}