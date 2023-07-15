import { trigger, state, style, transition, animate } from '@angular/animations';

export const shakeAnimation = trigger('shakeAnimation', [
  state('start', style({ transform: 'translateX(0)' })),
  state('end', style({ transform: 'translateX(0)' })),
  transition('void => *', []),
  transition('start => end', [
    animate('100ms ease-in-out', style({ transform: 'translateX(-10px)' })),
    animate('100ms ease-in-out', style({ transform: 'translateX(10px)' })),
    animate('100ms ease-in-out', style({ transform: 'translateX(-10px)' })),
    animate('100ms ease-in-out', style({ transform: 'translateX(10px)' })),
    animate('100ms ease-in-out', style({ transform: 'translateX(0)' }))
  ])
]);




// import {
//     animate,
//     state,
//     style,
//     transition,
//     trigger,
//   } from "@angular/animations";
  
//   export const shakeAnimation = trigger("shakeAnimation", [
//     state(
//       "start",
//       style({
//         transform: "translateX(0)",
//       })
//     ),
//     transition("* => *", [
//       animate(
//         "0.1s",
//         style({
//           transform: "translate3d(-5px, 0, 0)",
//         })
//       ),
//       animate(
//         "0.2s",
//         style({
//           transform: "translate3d(5px, 0, 0)",
//         })
//       ),
//       animate(
//         "0.1s",
//         style({
//           transform: "translate3d(-5px, 0, 0)",
//         })
//       ),
//       animate(
//         "0.2s",
//         style({
//           transform: "translate3d(5px, 0, 0)",
//         })
//       ),
//       animate(
//         "0.1s",
//         style({
//           transform: "translate3d(-5px, 0, 0)",
//         })
//       ),
//       animate(
//         "0.2s",
//         style({
//           transform: "translate3d(5px, 0, 0)",
//         })
//       ),
//       animate(
//         "0.1s",
//         style({
//           transform: "translate3d(-5px, 0, 0)",
//         })
//       ),
//       animate(
//         "0.2s",
//         style({
//           transform: "translate3d(5px, 0, 0)",
//         })
//       ),
//     ]),
// ]);

  