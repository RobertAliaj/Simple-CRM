import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TypedAnimationService } from '../typed-animation.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: any[] = [];
  apiKey2 = '5edb8f8face96bfd5c78b9fbc761777b';
  apikey1 = 'ecb542685608d42c858ef57eff5b1663';
  q = 'crypto';
  url = 'https://gnews.io/api/v4/search?q=' + this.q + '&lang=en&country=us&max=10&apikey=' + this.apikey1;

  creditLink = '<a href="https://gnews.io/" target="_blank" class="link">Gnews API</a>';

  @ViewChild('typedTarget') typedTarget!: ElementRef;

  constructor(private animation: TypedAnimationService) { }


  ngOnInit() {
    // this.getData();
  }

  getData() {
    fetch(this.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.articles = data.articles;
        setTimeout(() => {
          this.animation.splashScreen(this.creditLink, this.typedTarget)
        }, 500);
      });
  }


}
