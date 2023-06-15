import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BtcDataService {

  btcData: any;



  constructor(private http: HttpClient) {
    this.btcData = this.initializeBTCData();
  }


  initializeBTCData() {
    return {
      date: [],
      price: [],
      market_cap: []
    };
  }

  resetBTCData() {
    this.btcData = this.initializeBTCData();
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
    let responseAsJSON = await this.http.get(url).toPromise();

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
}


