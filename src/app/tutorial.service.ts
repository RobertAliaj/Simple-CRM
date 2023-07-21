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
      description: 'Welcome to the Crypto Owners CRM! Stay updated with the current BTC price, monitor the Bitcoin balance of other users, and even facilitate transfers to increase their holdings. This tutorial will guide you through the main functionalities of my web application. Let\'s dive in together, click Next to start the journey! ',
    },
    {
      title: 'Login',
      img: 'lets-go.webp',
      description: 'Register to fully unlock all the features of the app. Alternatively, you can log in as a guest , though please note that this limits your access to some functionalities.',
    },
    {
      title: 'Dashboard',
      img: 'dashboard.webp',
      description: 'Here you can retrieve the current Bitcoin prices and market capitalizations to stay up to date.'
    },
    {
      title: 'User',
      img: 'add-user.webp',
      description: 'Overview of all users.'
    },
    {
      title: 'User',
      img: 'openuser.webp',
      description: 'You can click on the username to go to the \'User Details\'.'
    },
    {
      title: 'Search',
      img: 'openuser.webp',
      description: 'Utilize the search bar to find specific users or transactions.'
    },
    {
      title: 'User Detail',
      img: 'user-detail.webp',
      description: ' Here, you get an overview of your details and the amount of Bitcoin you have received so far.'
    },
    {
      title: 'Edit User Detail',
      img: 'edit-user.webp',
      description: 'You can change your personal data here.'
    },
    {
      title: 'Delete the User',
      img: 'delete-user.webp',
      description: 'Or delete your account. (Only for registered users)'
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
      description: 'In the \'Transactions\' section, you can review and follow every completed transaction, observing both the sender and the receiver.'
    },
    {
      title: 'Transaction Chart',
      img: 'transaction1.webp',
      description: 'Each user\'s Bitcoin balance is neatly displayed in a chart.'
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