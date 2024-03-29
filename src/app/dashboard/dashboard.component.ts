import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BtcDataService } from '../btc-data.service';
import { TypedAnimationService } from '../typed-animation.service';

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
  landScapeView: boolean = true;
  creditLink: string = '<a href="https://www.coingecko.com/en/api" target="_blank" class="link">CoinGecko API</a>';
  @ViewChild('typedTarget') typedTarget!: ElementRef;
  @ViewChild('rotate') rotate!: ElementRef;
  @ViewChild('chart') chart!: ElementRef;
  myChart!: any;


  constructor(private btcService: BtcDataService, private animationService: TypedAnimationService) { }


  ngOnInit() {
    this.loading = true;
    this.handleLastFetch();
    this.initBtcData();
  }


  /**
   * The CoinGecko Api allows only 15 calls per Minute. 
   * Check the last Fetchtime, it is saved in localstorage, if not then its null.
   */
  handleLastFetch() {
    let lastFetchDateTimeString = localStorage.getItem('lastFetchDateTime');
    let lastFetchDateTime = lastFetchDateTimeString ? new Date(lastFetchDateTimeString) : null;

    this.checkFetchAbility(lastFetchDateTime);
    this.updateLastFetchTime();
  }


  /**
   *  Check if there has been fetched
   * 
   * @param lastFetchDateTime - Date of the last fetch.
   */
  checkFetchAbility(lastFetchDateTime: any) {
    if (lastFetchDateTime) {
      let elapsedSeconds = (Date.now() - lastFetchDateTime.getTime()) / 1000;
      this.canFetch = elapsedSeconds > 60;
    }
  }


  /**
   * Set new fetch time
   */
  updateLastFetchTime() {
    let now = new Date();
    localStorage.setItem('lastFetchDateTime', now.toString());
  }


  async initBtcData() {
    this.btcService.resetBTCData();
    if (this.canFetch) await this.fetchAndRender(); else this.renderFromLocalStorage();
    this.playTypingAnimation();
  }


  /**
   * Fetch the Btc Data through the btcDataService using CoinGeckoApi
   */
  async fetchAndRender() {
    await this.fetchData();
    this.saveLastBTCFetchInLocalStorage();
    this.renderChart(this.btcService.btcData.date, this.btcService.btcData.price, this.btcService.btcData.market_cap);
    this.loading = false;
  }


  /**
   * Render the Data that has been Saved in local storage
   */
  renderFromLocalStorage() {
    this.getLocalStorageData();
    this.renderChart(this.btcDataCopy.date, this.btcDataCopy.price, this.btcDataCopy.market_cap);
    this.loading = false;
  }


  async fetchData() {
    for (let i = 0; i < 7; i++) {
      let date = this.btcService.setDateFortheLastSevenDays(i);
      let responseAsJSON = await this.btcService.fetchApiData(date);
      this.btcService.pushDataToBtcData(responseAsJSON, date);
    }
  }


  getLocalStorageData() {
    let retrievedObject: any = localStorage.getItem('btcDataCopy');
    this.btcDataCopy = JSON.parse(retrievedObject);
  }


  playTypingAnimation() {
    setTimeout(() => {
      this.animationService.typeAnimation(this.typedTarget, this.creditLink);
    }, 500);
  }


  /**
   * Save the last Fetch in the Local Storage
   */
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
    if (this.myChart) this.myChart.destroy();
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: date.reverse(),
        datasets: [{
          label: 'Bitcoin Price',
          data: price.reverse(),
          yAxisID: 'y',
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
        {
          label: 'Bitcoin MarketCap',
          data: market_cap.reverse(),
          yAxisID: 'y1',
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            display: false,
          }
        },
        scales: {
          y: {
            min: 0,
            title: {
              display: true,
              text: 'Price (USD)'
            }
          },
          y1: {
            min: 0,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            title: {
              display: true,
              text: 'MarketCap (Billion USD)'
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce',
        }
      }
    });
  }
}