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
    // this.getData();
  }

  apikey = '5edb8f8face96bfd5c78b9fbc761777b';
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
