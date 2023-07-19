import { Component, OnInit } from '@angular/core';
import { BtcDataService } from '../btc-data.service';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc, where, query } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Transaction } from 'src/models/transaction.class';
import { User } from 'src/models/user.class';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-dialog-add-transaction',
  templateUrl: './dialog-add-transaction.component.html',
  styleUrls: ['./dialog-add-transaction.component.scss']
})
export class DialogAddTransactionComponent implements OnInit {

  usdAmount!: number;
  usdAmountAsString: string = this.formatNumberToUSD(0);
  btcAmount: string = '0';
  responseAsJSON: any;
  transaction: Transaction = new Transaction();
  user!: User;
  sender!: User;
  loading: boolean = false;
  userId!: string;
  currentLoggedUser!: any;

  constructor(
    private btcService: BtcDataService,
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddTransactionComponent>,
    private authService: AuthService
  ) {
  }


  ngOnInit() {
    this.gatherAndProcessBTCData();
    this.getCurrentLoggedUser();
  }


  /**
 * Gather BTC Data so the current price can be calculated
 */
  async gatherAndProcessBTCData() {
    let date = this.btcService.setDateFortheLastSevenDays(0);
    this.responseAsJSON = await this.btcService.fetchApiData(date);
  }


  async getCurrentLoggedUser() {
    this.currentLoggedUser = await this.authService.getCurrentLoggedInEmail();

    const usersCollectionRef = collection(this.firestore, 'users');
    const userQuery = query(usersCollectionRef, where("email", "==", this.currentLoggedUser));

    const userQuerySnapshot = await getDocs(userQuery);
    userQuerySnapshot.forEach((doc) => {
      this.sender = new User(doc.data());
    });
  }


  async updateUserBtcAmount() {
    let addedBtcAmount = parseFloat(this.btcAmount);
    const docRef = doc(this.firestore, 'users', this.userId);
    const docSnap = await getDoc(docRef);
    
    const currentUser = new User(docSnap.data());
    const currentBtcAmount = currentUser.btcAmount;
    if (currentBtcAmount) {
      const updatedBtcAmount = currentBtcAmount + addedBtcAmount;
      await updateDoc(docRef, {
        btcAmount: updatedBtcAmount
      });
    } else {
      await updateDoc(docRef, {
        btcAmount: addedBtcAmount
      });
    }
  }


  async saveTransaction() {
    if (this.transaction.usdAmount) {
      this.loading = true;
      this.getCurrentLoggedUser();
      this.getTransactionValues();
      this.addTransaction();
      this.updateUserBtcAmount();
    }
  }


  /**
   * Save all needed Value from the User who is making a transaction
   */
  getTransactionValues() {
    let date = new Date();
    let timeStamp = date.getTime();
    this.transaction.date = this.btcService.setDateFortheLastSevenDays(0);
    this.transaction.firstName = this.user.firstName;
    this.transaction.lastName = this.user.lastName;
    this.transaction.btcAmount = this.btcAmount;
    this.transaction.timeStamp = timeStamp;
    this.transaction.isNew = true;
    this.transaction.senderName = this.sender.firstName;
    this.transaction.senderLastName = this.sender.lastName;
  }


  async addTransaction() {
    const transactionsCollection = collection(this.firestore, 'transactions');
    addDoc(transactionsCollection, this.transaction.toJson()).then(async (result) => {
      const docSnap = await getDoc(result);
      this.loading = false;
      this.dialogRef.close();
    });
  }


  onUSDAmountChange(usd: number) {
    this.usdAmount = usd;
    this.usdAmountAsString = this.formatNumberToUSD(this.usdAmount);
    this.calculateUSDtoBTC();
  }


  calculateUSDtoBTC() {
    let currentPrice = this.responseAsJSON.market_data.current_price.usd;
    let btcAmount = this.usdAmount / currentPrice;
    btcAmount = parseFloat(btcAmount.toFixed(4));
    this.btcAmount = btcAmount.toString();
  }


  formatNumberToUSD(number: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(number);
  }
}
