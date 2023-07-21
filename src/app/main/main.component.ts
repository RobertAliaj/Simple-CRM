import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  canopenTutorial!: any;
  canOpenSideNav!: boolean;
  logo: string = ''
  logoStyle: string = '';
  showText: boolean = false;
  @ViewChild('menuTitle') menuTitle!: ElementRef;
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('drawer') drawer!: MatDrawer;


  URL_TITLE_MAP = new Map([
    ['/', 'Log In'],
    ['/login', 'Log In'],
    ['/signUp', 'Sign Up'],
    ['/dashboard', 'Dashboard'],
    ['/user', 'Users'],
    ['/transactions', 'History'],
    ['/news', 'News'],
    ['/help', 'Help'],
    ['/privacy', 'Privacy Policy'],
    ['/imprint', 'Imprint'],
    ['/transaction-chart', 'Chart']
  ]);

  DEFAULT_TITLE = 'Users / User Details';

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  
  ngOnInit() {
    this.checkIfCanOpenTutorial();
    this.handleInnerWidth();
    this.router.events.subscribe(event => this.onNavigationEnd(event));
  }


  /**
   * This Method is used to open the Tutorial Screen if you're using the App for the First time
   */
  checkIfCanOpenTutorial() {
    const showTutorialValue = localStorage.getItem('showTutorial');
    this.canopenTutorial = Boolean(showTutorialValue); // convert the string to boolean

    if (!this.canopenTutorial) { this.openTutorial(); };
  }


  openTutorial() {
    const dialogRef = this.dialog.open(TutorialComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      localStorage.setItem('showTutorial', 'started');
      this.canopenTutorial = true;
    });
  }


  /**
  * Handle InnerWidth when Initializing the App
  */
  handleInnerWidth() {
    if (window.innerWidth < 1100 || this.router.url == '/login' || this.router.url == '/') {
      this.canOpenSideNav = false;
    } else {
      this.canOpenSideNav = true;
    }
    window.innerWidth < 700 ? this.showResponsiveView() : this.showStandardView();
  }


  /**
   * Processes the NavigationEnd event and sets the menu title based on the current URL.
   *
   * @param {NavigationEnd} event - The NavigationEnd event containing information about the navigation.
   */
  onNavigationEnd(event: any) {
    if (event instanceof NavigationEnd) {
      this.setMenuTitleBasedOnUrl(event.url);
      if (event.url == '/login' || event.url == '/' || event.url == '/signUp') this.canOpenSideNav = false; else this.canOpenSideNav = true;
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
    this.canOpenSideNav = event.target.innerWidth < 1100 ? false : true;
    event.target.innerWidth < 800 ? this.showResponsiveView() : this.showStandardView();
  }


  showResponsiveView() {
    this.logo = 'logo-small.webp';
    this.logoStyle = '40px';
    this.showText = true;
  }


  showStandardView() {
    this.logo = 'logo.webp';
    this.logoStyle = 'unset';
    this.showText = false;
  }


  closeSideNav(drawer: MatDrawer) {
    if (window.innerWidth < 650) drawer.close();
  }


  logOut() {
    this.router.navigate(['login']);
    this.authService.signOut();
  }
}