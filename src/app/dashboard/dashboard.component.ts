import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  API_KEY = 'ZYenAkMWNHxDLb_BdhFw';
  bitcoinToday: any;
  bitcoinDate: any;
  endDate: any;
  startDate: any;

  btcPrice: any = {
    price: [],
    date: []
  };


  constructor() {
  }

  ngAfterViewInit() {
    this.getDate();
    this.fetchData();
  }


  renderChart(date: any, price: any) {
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: date,
        datasets: [{
          label: 'Price',
          data: price,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }


  async fetchData() {
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${this.startDate}&end_date=${this.endDate}&api_key=${this.API_KEY}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    this.pushData(responseAsJSON);
  }


  pushData(responseAsJSON: any) {
    for (let i = 0; i < 7; i++) {
      let bitcoinToday = responseAsJSON['dataset']['data'][i][1];
      let bitcoinDate = responseAsJSON['dataset']['data'][i][0];

      this.btcPrice['price'].push(bitcoinToday);
      this.btcPrice['date'].push(bitcoinDate);
      console.log(bitcoinToday);
    }
    this.renderChart(this.btcPrice.date, this.btcPrice.price);
  }

  getDate() {
    this.endDate = new Date().toISOString().split('T')[0];
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 7); // eine Woche zurückgehen
    this.startDate = this.startDate.toISOString().split('T')[0];
  }
}