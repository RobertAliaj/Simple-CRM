import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  checkScreenSize!: boolean;

  @ViewChild('menuTitle') menuTitle!: ElementRef;

  constructor(public router: Router) { }

  ngOnInit() {
    this.checkScreenSize = window.innerWidth < 1100 ? false : true;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/news') {
          this.menuTitle.nativeElement.textContent = 'News';
        } else if (event.url === '/') {
          this.menuTitle.nativeElement.textContent = 'Dashboard';
        } else if (event.url === '/user') {
          this.menuTitle.nativeElement.textContent = 'Users';
        } else if (event.url === '/transactions') {
          this.menuTitle.nativeElement.textContent = 'Transactions History';
        } else if (event.url === '/help') {
          this.menuTitle.nativeElement.textContent = 'Help';
        } else {
          this.menuTitle.nativeElement.textContent = 'Users / User Details';
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize = event.target.innerWidth < 1100 ? false : true;
  }
}