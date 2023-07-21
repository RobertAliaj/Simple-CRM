import { Component, HostListener } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { collection, onSnapshot } from 'firebase/firestore';

Chart.register(ChartDataLabels);


@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent {

  myChart!: any;
  allUsers!: any;
  userData!: any;
  users!: any;
  filteredNamesAmount: any = 0;
  loading: boolean = false;


  constructor(private firestore: Firestore, private router: Router) {
  }


  ngOnInit() {
    this.userData = this.initializeUserData();
    this.loading = true;
    this.getAllUsers();
  }


  initializeUserData() {
    return {
      name: [],
      amount: [],
      color: []
    };
  }


  /**
   * Get all Users from Firebase
  */
  getAllUsers() {
    const collectionRef = collection(this.firestore, 'users');
    onSnapshot(collectionRef, (snapshot) => {
      let changes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.allUsers = changes;
      this.sortUserDataAndRender();
    });
  }


  sortUserDataAndRender() {
    this.sortDataForChart();
    this.renderChart(this.userData.name, this.userData.amount, this.userData.color);
    this.loading = false;
  }


  sortDataForChart() {
    for (let i = 0; i < this.allUsers.length; i++) {
      const user = this.allUsers[i];
      let name = user.firstName + ' ' + user.lastName.charAt(0) + '.';
      let amount = user.btcAmount ? user.btcAmount.toFixed(2) : null;
      let color = user.color;
      this.pushSortedDataToUserData(name, amount, color)
    }
  }


  pushSortedDataToUserData(name: any, amount: any, color: any) {
    this.userData.amount.push(amount);
    this.userData.name.push(name);
    this.userData.color.push(color);
  }


  filterUsersByFirstName(searchValue: string) {
    const filteredIndices = this.getFilteredIndicesBasedOnFirstName(searchValue);
    const filteredNames = this.getFilteredData(this.userData.name, filteredIndices);
    const filteredAmounts = this.getFilteredData(this.userData.amount, filteredIndices);
    const filteredColors = this.getFilteredData(this.userData.color, filteredIndices);

    this.renderFilteredData(filteredNames, filteredAmounts, filteredColors)
    this.filteredNamesAmount = filteredNames;
  }


  /**
   * Searches for user names in the userData array that contain the given search value in the first name.
   * Returns an array of indices of these names.
   *
   * @param {string} searchValue - The search value to look for in the users' first names.
   * @returns {number[]} filteredIndices - An array containing the indices of the names in the userData array that include the search value.
   * Each index in the array corresponds to the position of a user name in the userData array whose first name includes the search value.
   */
  getFilteredIndicesBasedOnFirstName(searchValue: string): number[] {
    let filteredIndices: number[] = [];

    this.userData.name.forEach((fullName: string, index: number) => {
      const firstName = fullName.split(' ')[0].toLowerCase();
      const isIncluded = firstName.includes(searchValue.toLowerCase());

      if (isIncluded) filteredIndices.push(index);
    });

    return filteredIndices;
  }


  /**
  * Filters an array of data based on the provided indices.
  * Returns an array containing only the elements at the positions specified by the filteredIndices.
  *
  * @param {any[]} data - The data array to be filtered.
  * @param {number[]} filteredIndices - The indices of the elements to be included in the filtered data.
  * @returns {any[]} A filtered array containing only the elements from the data array at the positions specified by the filteredIndices.
  */
  getFilteredData(data: any[], filteredIndices: number[]): any[] {
    return filteredIndices.map((index) => data[index]);
  }


  renderFilteredData(filteredNames: any, filteredAmounts: any, filteredColors: any) {
    if (filteredNames.length > 0) {
      this.renderChart(filteredNames, filteredAmounts, filteredColors)
    } else {
      this.renderChart(this.userData.name, this.userData.amount, this.userData.color)
    }
  }


  /**
   * Render the Chart again if the window gets resized
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.renderChart(this.userData.name, this.userData.amount, this.userData.color);
  }


  getRandomLightColor() {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 20) + 73;
    let lightness = Math.floor(Math.random() * 30) + 63;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


  renderChart(names: any, amount: any, color: any) {
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
            backgroundColor: color,
            borderColor: color,
            borderWidth: 2
          }]
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: true,
            }
          },
          animation: {
            duration: 1000,
            easing: 'easeOutBounce',
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Username'
              }
            },
            x: {
              title: {
                display: true,
                text: 'BTC Amount'
              }
            }
          }
        }
      });
    }
  }

}
