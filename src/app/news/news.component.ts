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
  apiKey1 = 'ecb542685608d42c858ef57eff5b1663';
  q = 'crypto';
  url = 'https://gnews.io/api/v4/search?q=' + this.q + '&lang=en&country=us&max=10&apikey=' + this.apiKey1;
  creditLink = '<a href="https://gnews.io/" target="_blank" class="link">Gnews API</a>';

  loading: boolean = true;

  @ViewChild('typedTarget') typedTarget!: ElementRef;
  @ViewChild('error') error!: ElementRef;

  constructor(private animation: TypedAnimationService) { }

  async ngOnInit() {
    await this.getData();
  }


  async getData() {
    const response = await fetch(this.url);
    const data = await response.json();
    this.articles = data.articles;
    this.loading = false;
    this.playTypingAnimation();
  }


  playTypingAnimation() {
    setTimeout(() => {
      this.animation.typeAnimation(this.typedTarget, this.creditLink)
    }, 500);
  }
}