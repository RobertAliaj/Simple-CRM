import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';

import Typed from 'typed.js';


@Injectable({
  providedIn: 'root'
})
export class TypedAnimationService {


  constructor() { }

  splashScreen(link: string, typedTarget: ElementRef) {
    const typed2 = new Typed(typedTarget.nativeElement, {
      strings: ['Data provided by ' + link + ' !'],
      typeSpeed: 30,
      backSpeed: 30,
      fadeOut: true,
      loop: false,
      onComplete: (self) => {
        self.cursor.style.visibility = 'hidden';
      }
    });
  }


}
