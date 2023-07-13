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

  chartData = [
    {
      "name": "Objekt 1",
      "zahl": 1
    },
    {
      "name": "Objekt 2",
      "zahl": 2
    },
    {
      "name": "Objekt 3",
      "zahl": 3
    },
    {
      "name": "Objekt 4",
      "zahl": 4
    },
    {
      "name": "Objekt 5",
      "zahl": 5
    }
  ];


  constructor(private firestore: Firestore, private router: Router) {
  }

  initializeUserData() {
    return {
      name: [],
      amount: []
    };
  }


  ngAfterViewInit() {
    if (this.router.url == '/transaction-chart')
      this.getAllUsers();
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
      console.log(this.userData);
      this.renderChart(this.userData.name, this.userData.amount);
    });
  }


  sortDataForChart() {
    this.userData = this.initializeUserData();
    for (let i = 0; i < this.allUsers.length; i++) {
      const element = this.allUsers[i];
      let fullName = element.firstName + ' ' + element.lastName;
      let amount = element.btcAmount;
      this.userData.amount.push(amount);
      this.userData.name.push(fullName);
    }
  }


  renderChart(names: any, amount: any) {
    if (this.myChart) this.myChart.destroy();
    if (this.router.url == '/transaction-chart') {
      this.myChart = new Chart('transactionChart', {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Bitcoin Amount',
            data: amount,
            yAxisID: 'y',
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
          }]
        },
        options: {
          indexAxis: 'y',
        }
      });
    }
  }

}
