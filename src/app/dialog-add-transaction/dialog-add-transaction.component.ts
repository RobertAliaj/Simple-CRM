import { Component } from '@angular/core';
import { BtcDataService } from '../btc-data.service';


@Component({
  selector: 'app-dialog-add-transaction',
  templateUrl: './dialog-add-transaction.component.html',
  styleUrls: ['./dialog-add-transaction.component.scss']
})
export class DialogAddTransactionComponent {

  usdAmount!: number;
  usdAmountAsString: string = this.formatNumberToUSD(0);
  btcAmount: number = 0;
  responseAsJSON: any;


  constructor(private btcService: BtcDataService) {
    this.gatherAndProcessBTCData();
  }


  async gatherAndProcessBTCData() {
    let date = this.btcService.setDateFortheLastSevenDays(0)
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
    btcAmount = parseFloat(btcAmount.toFixed(8));
    this.btcAmount = btcAmount;
  }

  
  formatNumberToUSD(number: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(number);
  }
}
