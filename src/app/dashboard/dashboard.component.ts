import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  btcData: any = {
    date: [],
    price: [],
    market_cap: []
  };

  constructor() {
  }

  ngAfterViewInit() {
    this.gatherAndProcessBTCData();
  }

  /**
   *  This Method is used to gather and prozess the BTC Data for the last 7 days from today
   */
  async gatherAndProcessBTCData() {
    for (let i = 0; i < 7; i++) {
      let date = this.setDateFortheLastSevenDays(i)
      let responseAsJSON = await this.fetchApiData(date);
      this.pushDataToBtcData(responseAsJSON, date);
    }

    this.renderChart(this.btcData.date, this.btcData.price, this.btcData.market_cap);
  }


  /**
   * This function is used to set a set a new Date (in this case for the last 7 days)
   * 
   * @param {number} i - The number of days to subtract from the current date (or the date of the previous day if the current time is before 3 a.m.).
   * @returns {string}  A string representing the Date in this format dd-mm-yyyy
   */
  setDateFortheLastSevenDays(i: number) {
    let currentDate = this.getCurrentDateBasedOnTime();
    let date = new Date();
    date.setDate(currentDate.getDate() - i);
    let formattedDate = this.formatDate(date);

    return formattedDate;
  }


  /**
   *  This function is used to set the currentDate based on the time.
   *  If its earlier than 3 O'clock then it uses the date from yesterday because the CoinGeckoAPI doesnt have the BTC Data for the new day yet.
   * 
 * @returns {Date} A Date object representing either the current date or the date of the previous day.
   */
  getCurrentDateBasedOnTime() {
    let today = new Date();
    let time = today.getHours();
    let currentDate;

    if (time >= 3) {
      currentDate = new Date();
    } else {
      currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return currentDate;
  }


  /**
   * This asynchronous function fetches data from the API based on a given date.
   *
   * @param {string} date - A string representing the day for which data is to be fetched.
   * The date string should be in the format that the API expects.
   *
   * @returns {Promise<Object>} A Promise that resolves to an object containing the JSON response from the API.
   */
  async fetchApiData(date: string) {
    let url = `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${date}&localization=false`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();

    return responseAsJSON;
  }


  /**
   * This function takes Api data and a date as input and adds the corresponding values
   * (date, price, and market cap) to the btcData object.
   *
   * @param {Object} responseAsJSON - An object containing the JSON response from the API.
   * 
   * @param {Date|string} date - A Date object or string representing the date for which the data was retrieved.
   */
  pushDataToBtcData(responseAsJSON: any, date: any) {
    let price = responseAsJSON.market_data.current_price.usd.toFixed(2);
    let marketCapInBillion: any = responseAsJSON.market_data.market_cap.usd / 1e9;
    marketCapInBillion = marketCapInBillion.toFixed(2);

    this.btcData.date.push(date);
    this.btcData.price.push(price);
    this.btcData.market_cap.push(marketCapInBillion);
  }


  /**
   * This Function is used to format the Date in the desired format: dd-mm-yyy
   */
  formatDate(date: any) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}-${month}-${year}`;
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