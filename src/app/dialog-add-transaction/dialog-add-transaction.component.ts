import { Component, OnInit } from '@angular/core';
import { BtcDataService } from '../btc-data.service';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Transaction } from 'src/models/transaction.class';
import { User } from 'src/models/user.class';



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
  loading: boolean = false;

  constructor(
    private btcService: BtcDataService,
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddTransactionComponent>,
  ) {
  }


  ngOnInit() {
    this.gatherAndProcessBTCData();
  }


  async saveTransaction() {
    this.loading = true;
    const usersCollection = collection(this.firestore, 'transactions');
    this.saveToFireBase();
    addDoc(usersCollection, this.transaction.toJson()).then(async (result) => {
      const docSnap = await getDoc(result);
      this.loading = false;
      this.dialogRef.close();
    });
  }


  saveToFireBase() {
    this.transaction.date = this.btcService.setDateFortheLastSevenDays(0);
    this.transaction.firstName = this.user.firstName;
    this.transaction.lastName = this.user.lastName;
    this.transaction.btcAmount = this.btcAmount;
  }


  async gatherAndProcessBTCData() {
    let date = this.btcService.setDateFortheLastSevenDays(0);
    this.responseAsJSON = await this.btcService.fetchApiData(date);
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