import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  
  @ViewChild('menuTitle') menuTitle!: ElementRef;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/news') {
          this.menuTitle.nativeElement.textContent = 'News';
        } else if (event.url === '/') {
          this.menuTitle.nativeElement.textContent = 'Dashboard';
        } else if (event.url === '/user') {
          this.menuTitle.nativeElement.textContent = 'Users';
        } else {
          this.menuTitle.nativeElement.textContent = 'Transactions History';
        }
      }
    });
  }
}