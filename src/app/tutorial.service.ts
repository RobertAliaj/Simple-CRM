import { Injectable } from '@angular/core';

interface TutorialSlide {
  title: string;
  subtitle: string;
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
      subtitle: "If you're seeing this it means you're here for the first time! Let me explain to you what you can do in this App!",
      img: 'lets-go.png',
      description: 'Click "Next" to start with the Tutorial'
    },
    {
      title: 'Dashboard',
      subtitle: 'View Bitcoin Chart.',
      img: 'dashboard.png',
      description: ''
    }, {
      title: 'User',
      subtitle: 'Overview of all the users.',
      img: 'user.png',
      description: 'Lorem Ipsum'
    }, {
      title: 'Transactions',
      subtitle: 'Overview of all available transactions.',
      img: 'transaction.png',
      description: 'Lorem Ipsum Transaction'
    }, {
      title: 'News',
      subtitle: 'Daily news about crypto currency.',
      img: 'news.png',
      description: 'Lorem Ipsum News'
    }, {
      title: 'Help',
      subtitle: 'Just in case if you forget.',
      img: 'help.png',
      description: 'Here you can have an overview of the Functionalities of this App anytime!'
    },
    {
      title: 'Help',
      subtitle: 'Just in case if you forget.',
      img: 'help.png',
      description: 'Here you can have an overview of the Functionalities of this App anytime!'
    }
  ];

  constructor() { }

  getTutorial() {
    return this.tutorial;
  }
}
