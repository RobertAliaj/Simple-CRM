import { Component, ElementRef, HostListener, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  isUserLoggedIn: boolean = false;
  showTutorial!: any;
  checkScreenSize!: boolean;
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
  private authSubscription: Subscription | undefined

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // this.authSubscription = this.authService.getAuthState().subscribe(isLoggedIn => {
    //   this.isUserLoggedIn = isLoggedIn;
    // });
    this.openTutorial();
    this.handleInnerWidth();
    this.router.events.subscribe(event => this.onNavigationEnd(event));
  }

  ngOnDestroy() {
    // Stellt sicher, dass das Abonnement beendet wird, wenn die Komponente zerstört wird
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  /**
   * This Method is used to open the Tutorial Screen if you're using the App for the First time
   */
  openTutorial() {
    const showTutorialValue = localStorage.getItem('showTutorial');
    this.showTutorial = Boolean(showTutorialValue); // convert the string to boolean

    if (!this.showTutorial) {
      const dialogRef = this.dialog.open(TutorialComponent, {});

      dialogRef.afterClosed().subscribe(() => {
        localStorage.setItem('showTutorial', 'started');
        this.showTutorial = true;
      });
    }
  }


  /**
 * Handle InnerWidth when Initializing the App
 */
  handleInnerWidth() {
    if (window.innerWidth < 1100 || this.router.url == '/login' || this.router.url == '/') this.checkScreenSize = false; else this.checkScreenSize = true;
    // this.checkScreenSize = window.innerWidth < 1100 || this.router.url == '/login' || this.router.url == '/' ? false : true;
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
      if (event.url == '/login' || event.url == '/' || event.url == '/signUp') this.checkScreenSize = false; else this.checkScreenSize = true;
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

  closeMenu(drawer: MatDrawer) {
    if (window.innerWidth < 650)
      drawer.close();
  }

  logOut() {
    this.router.navigate(['login']);
    this.authService.signOut();
  }
}