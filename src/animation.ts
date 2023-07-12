import {
    animate,
    state,
    style,
    transition,
    trigger,
  } from "@angular/animations";
  
  export const shakeAnimation = trigger("shake", [
    state(
      "start",
      style({
        transform: "translateX(0)",
      })
    ),
    transition("* => *", [
      animate(
        "0.1s",
        style({
          transform: "translate3d(-5px, 0, 0)",
        })
      ),
      animate(
        "0.2s",
        style({
          transform: "translate3d(5px, 0, 0)",
        })
      ),
      animate(
        "0.1s",
        style({
          transform: "translate3d(-5px, 0, 0)",
        })
      ),
      animate(
        "0.2s",
        style({
          transform: "translate3d(5px, 0, 0)",
        })
      ),
      animate(
        "0.1s",
        style({
          transform: "translate3d(-5px, 0, 0)",
        })
      ),
      animate(
        "0.2s",
        style({
          transform: "translate3d(5px, 0, 0)",
        })
      ),
      animate(
        "0.1s",
        style({
          transform: "translate3d(-5px, 0, 0)",
        })
      ),
      animate(
        "0.2s",
        style({
          transform: "translate3d(5px, 0, 0)",
        })
      ),
    ]),
]);

  