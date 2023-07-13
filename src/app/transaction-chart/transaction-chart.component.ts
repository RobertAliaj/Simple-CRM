import { Component, ElementRef, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Chart } from 'chart.js';
import { collection, onSnapshot } from 'firebase/firestore';


@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent {

  @ViewChild('transactionChart') chart!: ElementRef;
  allUsers!: any;

  userData = {
    name: [] as string[], // Stellen Sie sicher, dass name als string[] Typ definiert ist
    amount: [] as string[], // Stellen Sie sicher, dass name als string[] Typ definiert ist
  }
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


  constructor(private firestore: Firestore) { }


  /**
 * Get all Users from Firebase
 */
  getAllUsers() {
    const collectionRef = collection(this.firestore, 'users');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.allUsers = changes;

      for (let i = 0; i < this.allUsers.length; i++) {
        const element = this.allUsers[i];
        console.log(element);
        let fullName = element.firstName + ' ' + element.lastName;
        let amount = element.btcAmount;
        this.userData.amount.push(amount);
        this.userData.name.push(fullName);
      }
      this.renderChart(this.userData.name, this.userData.amount)
    });
  }



  ngOnInit() {
    // this.getAllUsers();
  }



  renderChart(names: any, amount: any) {
    const myChart = new Chart('transactionChart', {
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
