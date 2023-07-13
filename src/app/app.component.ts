import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MatDialog } from '@angular/material/dialog';
import { onAuthStateChanged } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm'


constructor(){

}


  
}