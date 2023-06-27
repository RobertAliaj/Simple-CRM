import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  checkScreenSize!: boolean;
  logo: string = ''
  logoStyle: string = '';
  showText: boolean = false;
  @ViewChild('menuTitle') menuTitle!: ElementRef;
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(public router: Router) { }

  ngOnInit() {
    this.handleInnerWidth();
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


  //handle innerWidth while changing window size
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize = event.target.innerWidth < 1100 ? false : true;
    // this.logo = event.target.innerWidth < 650 ? 'logo-small.png' : 'logo.new2.png';
    // this.logoStyle = event.target.innerWidth < 650 ? '40px' : 'unset';

    if (event.target.innerWidth < 700) {
      this.logo = 'logo-small.png';
      this.logoStyle = '40px';
      this.showText = true;
    } else {
      this.logo = 'logo.new2.png';
      this.logoStyle = 'unset';
      this.showText = false;
    }
  }


  //handle innerWidth on initialization
  handleInnerWidth() {
    this.checkScreenSize = window.innerWidth < 1100 ? false : true;
    // this.logo = window.innerWidth < 650 ? 'logo-small.png' : 'logo.new2.png';
    // this.logoStyle = window.innerWidth < 650 ? '40px' : 'unset';

    if (window.innerWidth < 700) {
      this.logo = 'logo-small.png';
      this.logoStyle = '40px';
      this.showText = true;
    } else {
      this.logo = 'logo.new2.png';
      this.logoStyle = 'unset';
      this.showText = false;
    }
  }


  closeMenu(drawer: MatDrawer) {
    if (window.innerWidth < 650) {
      drawer.close();
    }
  }


  hideContent() {
    if (window.innerWidth < 650) {
      this.showText = true;
    }
  }
}