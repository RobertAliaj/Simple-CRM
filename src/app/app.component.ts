import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm'

  checkScreenSize!: boolean;
  logo: string = ''
  logoStyle: string = '';
  showText: boolean = false;
  @ViewChild('menuTitle') menuTitle!: ElementRef;
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('drawer') drawer!: MatDrawer;


  URL_TITLE_MAP = new Map([
    ['/', 'Dashboard'],
    ['/user', 'Users'],
    ['/transactions', 'Transactions History'],
    ['/news', 'News'],
    ['/help', 'Help']
  ]);

  DEFAULT_TITLE = 'Users / User Details';

  constructor(public router: Router) { }

  ngOnInit() {
    this.handleInnerWidth();
    this.router.events.subscribe(event => this.onNavigationEnd(event));
  }


  /**
 * Handle InnerWidth when Initializing the App
 */
  handleInnerWidth() {
    this.checkScreenSize = window.innerWidth < 1100 ? false : true;
    window.innerWidth < 700 ? this.showResponsiveView() : this.showStandardView();
  }


  /**
   * Verarbeitet das NavigationEnd-Event und setzt den Menütitel basierend auf der aktuellen URL.
   *
   * @param {NavigationEnd} event - Das NavigationEnd-Event, das die Information über die Navigation enthält.
   */
  onNavigationEnd(event: any) {
    if (event instanceof NavigationEnd) {
      this.setMenuTitleBasedOnUrl(event.url);
    }
  }


  setMenuTitleBasedOnUrl(url: string) {
    const title = this.URL_TITLE_MAP.get(url);
    this.setMenuTitle(title || this.DEFAULT_TITLE);
  }


  setMenuTitle(title: string) {
    this.menuTitle.nativeElement.textContent = title;
  }


  /**
   * Handle InnerWith when Resizing Window
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize = event.target.innerWidth < 1100 ? false : true;
    event.target.innerWidth < 700 ? this.showResponsiveView() : this.showStandardView();
  }


  showResponsiveView() {
    this.logo = 'logo-small.png';
    this.logoStyle = '40px';
    this.showText = true;
  }


  showStandardView() {
    this.logo = 'logo.png';
    this.logoStyle = 'unset';
    this.showText = false;
  }


  closeMenu(drawer: MatDrawer) {
    if (window.innerWidth < 650)
      drawer.close();
  }
}