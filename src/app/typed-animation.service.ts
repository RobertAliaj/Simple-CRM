import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';

import Typed from 'typed.js';


@Injectable({
  providedIn: 'root'
})
export class TypedAnimationService {


  constructor() { }

  typeAnimation(typedTarget: ElementRef, link?: string) {
    const typedString = link ? `Data provided by ${link} !` : 'The transaction record is currently empty.';

    const typed2 = new Typed(typedTarget.nativeElement, {
      strings: [typedString],
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