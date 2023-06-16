import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BtcDataService } from '../btc-data.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  canFetch: boolean = true;
  btcDataCopy: any;
  loading: boolean = false;

  constructor(private btcService: BtcDataService) { }


  ngOnInit() {
    // this.loading = true;
    // this.handleLastFetch();
    // this.gatherAndProcessBTCData();
  }


  handleLastFetch() {
    let lastFetchDateTimeString = localStorage.getItem('lastFetchDateTime');
    let lastFetchDateTime = lastFetchDateTimeString ? new Date(lastFetchDateTimeString) : null;

    if (lastFetchDateTime) {
      let elapsedSeconds = (Date.now() - lastFetchDateTime.getTime()) / 1000;
      elapsedSeconds > 30 ? this.canFetch = true : this.canFetch = false;
    }

    let now = new Date();
    localStorage.setItem('lastFetchDateTime', now.toString());
  }


  /**
   *  This Method is used to gather and prozess the BTC Data for the last 7 days from today
  */
  async gatherAndProcessBTCData() {
    this.btcService.resetBTCData();

    if (this.canFetch) {
      for (let i = 0; i < 7; i++) {
        let date = this.btcService.setDateFortheLastSevenDays(i);
        console.log(date);
        let responseAsJSON = await this.btcService.fetchApiData(date);
        this.btcService.pushDataToBtcData(responseAsJSON, date);
      }

      this.saveLastBTCFetchInLocalStorage();
      this.loading = false;
      this.renderChart(this.btcService.btcData.date, this.btcService.btcData.price, this.btcService.btcData.market_cap);
    } else {
      this.getLocalStorageData();
      this.loading = false;
      this.renderChart(this.btcDataCopy.date, this.btcDataCopy.price, this.btcDataCopy.market_cap);
    }
  }


  getLocalStorageData() {
    let retrievedObject: any = localStorage.getItem('btcDataCopy');
    this.btcDataCopy = JSON.parse(retrievedObject);
  }


  saveLastBTCFetchInLocalStorage() {
    this.btcDataCopy = this.btcService.btcData;
    localStorage.setItem('btcDataCopy', JSON.stringify(this.btcDataCopy));
  }


  /**
   * This function is used to render a chart based on inputted date, price, and market cap data.
   *
   * @param {Array} date - An array of dates for which data is available. Each date should correlate to a price and market cap value in the other arrays.
   * @param {Array} price - An array of price values corresponding to each date. Each price should correlate to a date and market cap value in the other arrays.
   * @param {Array} market_cap - An array of market cap values corresponding to each date. Each market cap should correlate to a date and price in the other arrays.
   */
  renderChart(date: any, price: any, market_cap: any) {
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: date.reverse(),
        datasets: [{
          label: 'Bitcoin Price',
          data: price.reverse(),
          yAxisID: 'y',
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        },
        {
          label: 'Bitcoin MarketCap',
          data: market_cap.reverse(),
          yAxisID: 'y1',
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }
        ]
      },
      options: {
        scales: {
          y: {
            min: 24000, // Startpunkt der y-Achse auf 20000 setzen
            title: {
              display: true,
              text: 'Price (USD)'
            }
          },
          y1: {
            min: 480, // Startpunkt der y-Achse auf 20000 setzen
            position: 'right',
            grid: {
              drawOnChartArea: false, // nur eine Netzlinie anzeigen
            },
            title: {
              display: true,
              text: 'MarketCap (Billion USD)'
            }
          }
        }
      }
    });
  }
}