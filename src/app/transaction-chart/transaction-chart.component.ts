import { Component, ElementRef, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { collection, onSnapshot } from 'firebase/firestore';


@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent {

  // @ViewChild('transactionChart') chart!: ElementRef;
  myChart!: any;
  allUsers!: any;
  userData!: any;
  users!: any;


  constructor(private firestore: Firestore, private router: Router) {
  }

  initializeUserData() {
    return {
      name: [],
      amount: [],
      color: []
    };
  }


  ngAfterViewInit() {
    if (this.router.url == '/transaction-chart')
      this.getAllUsers();
  }


  getRandomLightColor() {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 20) + 73;
    let lightness = Math.floor(Math.random() * 30) + 63;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


  /**
   * Get all Users from Firebase
  */
  getAllUsers() {
    const collectionRef = collection(this.firestore, 'users');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.allUsers = changes;
      this.sortDataForChart();
      this.renderChart(this.userData.name, this.userData.amount, this.userData.color);
    });
  }


  sortDataForChart() {
    this.userData = this.initializeUserData();
    for (let i = 0; i < this.allUsers.length; i++) {
      const element = this.allUsers[i];
      let fullName = element.firstName + ' ' + element.lastName;
      let amount = element.btcAmount;
      let color = element.color;
      this.userData.amount.push(amount);
      this.userData.name.push(fullName);
      this.userData.color.push(color);
    }
  }


  renderChart(names: any, amount: any, color: any) {
    if (this.myChart) this.myChart.destroy();
    if (this.router.url == '/transaction-chart') {
      this.myChart = new Chart('transactionChart', {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            data: amount,
            yAxisID: 'y',
            backgroundColor: color,
            borderColor: color,
            borderWidth: 2
          }]
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }

}
