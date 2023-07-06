import { Injectable } from '@angular/core';

interface TutorialSlide {
  title: string;
  img: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TutorialService {


  tutorial: TutorialSlide[] = [
    {
      title: 'Welcome to my Simple CRM Web Application !',
      img: 'lets-go.webp',
      description: "This application is a Customer Relationship Management - CRM - tool that operates with CRUD (Create, Read, Update, Delete) functionalities and is based on Angular. Firebase serves as the backend, while the user interface is designed using Angular Material, which is based on the principles of Material Design. This tutorial will guide you through the main functionalities of my web application. Let's dive in together, click Next to start the journey!"
    },
    {
      title: 'Dashboard',
      img: 'dashboard.webp',
      description: 'In the dashboard, you can see the current daily price and market cap of Bitcoin.'
    },
    {
      title: 'User',
      img: 'user.webp',
      description: 'In the user section, you can add a new user to your application. You can click on a username to navigate to the user details.'
    },
    {
      title: 'User Detail',
      img: 'user-detail.webp',
      description: 'In the User Detail section, you can edit the user details and \'send\' Bitcoin!'
    },
    {
      title: 'Transactions',
      img: 'transaction1.webp',
      description: 'In the Transaction History, you can have an overview of all transactions made.'
    },
    {
      title: 'News',
      img: 'news.webp',
      description: 'Stay updated with the latest Crypto World news.'
    },
    {
      title: 'Help',
      img: 'help.webp',
      description: 'Navigate to the Help section anytime you need an overview of the functionalities of this app.'
    },
    {
      title: 'Congratulations!',
      img: 'help.webp',
      description: 'Now you have a solid understanding of how this Simple CRM Web Application works. Remember, this tool is for demonstration purposes, so feel free to explore and test all features without hesitation. Happy exploring!'
    }
  ];

  constructor() { }

  getTutorial() {
    return this.tutorial;
  }
}
