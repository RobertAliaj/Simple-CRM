import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {


  articles: any[] = [];



  constructor(private http: HttpClient) {

  }


  ngOnInit() {
    this.getData();
  }

  apikey = 'ecb542685608d42c858ef57eff5b1663';
  q = 'crypto';
  url = 'https://gnews.io/api/v4/search?q=' + this.q + '&lang=en&country=us&max=10&apikey=' + this.apikey;

  getData() {
    let i: number;
    fetch(this.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.articles = data.articles;
      });
  }


}
