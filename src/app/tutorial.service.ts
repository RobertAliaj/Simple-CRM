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
      description: 'Welcome to the Crypto Owners CRM! Here you can manage your users, keep track of how many bitcoins your users have, and even send them a few more. This tutorial will guide you through the main functionalities of my web application. Let\'s dive in together, click Next to start the journey!',
    },
    {
      title: 'Dashboard',
      img: 'dashboard.webp',
      description: 'Here you can retrieve the current Bitcoin prices and market capitalizations to stay up to date.'
    },
    {
      title: 'User',
      img: 'add-user.webp',
      description: 'In the user area, you can have an overview of all your users and you can add a new one by clicking the plus button located at the bottom right.'
    },
        {
      title: 'User',
      img: 'openuser.webp',
      description: 'After you have created a user, you can click on the username to go to the \'User Details\'.'
    },
    {
      title: 'User Detail',
      img: 'user-detail.webp',
      description: 'Here, you get an overview of the user details and the amount of Bitcoin the user has received up to now.'
    }, 
    {
      title: 'Edit User Detail',
      img: 'edit-user.webp',
      description: 'Edit Personal User Details.'
    }, 
    {
      title: 'Delete the User',
      img: 'delete-user.webp',
      description: 'Delete the user by clicking the delete button.'
    }, 
    {
      title: 'Send Bitcoins',
      img: 'send-bitcoin.webp',
      description: ' Click on the \'Send\' button at the bottom right to perform a transaction.'
    },
    {
      title: 'Send Bitcoins',
      img: 'send-dialog.webp',
      description: '  Simply enter the amount of BTC you want to send and click on \'Send\'.'
    },
    {
      title: 'Transactions',
      img: 'transaction1.webp',
      description: 'In the \'Transactions\' section, you can view and track all completed transactions.'
    },
    {
      title: 'News',
      img: 'news.webp',
      description: 'Stay up-to-date with the \'News\' section. Thanks to the integration of the Gnews API, you receive daily current news from the world of cryptocurrencies here.'
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

      // description: "This application is a Customer Relationship Management - CRM - tool that operates with CRUD (Create, Read, Update, Delete) functionalities and is based on Angular. Firebase serves as the backend, while the user interface is designed using Angular Material, which is based on the principles of Material Design. This tutorial will guide you through the main functionalities of my web application. Let's dive in together, click Next to start the journey!"