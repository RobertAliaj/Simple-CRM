import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NewsComponent } from './news/news.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path : '', component:  DashboardComponent },
  // { path : 'dashboard', component:  UserComponent },
  { path : 'user', component:  UserComponent },
  { path : 'user/:id', component:  UserDetailComponent },
  { path : 'transactions', component:  TransactionsComponent },
  { path : 'news', component:  NewsComponent },
  { path : 'help', component:  InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
