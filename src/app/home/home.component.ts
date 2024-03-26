// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent  implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {}
//
// }




// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//     const CONTAINER = document.querySelector('.container') as HTMLElement; // Convertir a HTMLElement
//     const CARDS = document.querySelectorAll('article');
//
//     const CONFIG = {
//       proximity: 40,
//       spread: 80,
//       blur: 20,
//       gap: 32,
//       vertical: false,
//       opacity: 0,
//     };
//
//     const PROXIMITY = 10;
//
//     const UPDATE = (event: MouseEvent) => {
//       for (const CARD of CARDS) {
//         const CARD_BOUNDS = (CARD as HTMLElement).getBoundingClientRect();
//
//         if (
//           event.x > CARD_BOUNDS.left - CONFIG.proximity &&
//           event.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
//           event.y > CARD_BOUNDS.top - CONFIG.proximity &&
//           event.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
//         ) {
//           (CARD as HTMLElement).style.setProperty('--active', '1');
//         } else {
//           (CARD as HTMLElement).style.setProperty('--active', CONFIG.opacity.toString());
//         }
//
//         const CARD_CENTER = [
//           CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
//           CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5
//         ];
//         let ANGLE = Math.atan2(event.y - CARD_CENTER[1], event.x - CARD_CENTER[0]) * 180 / Math.PI;
//         ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
//         (CARD as HTMLElement).style.setProperty('--start', `${ANGLE + 90}`);
//       }
//     };
//
//     document.body.addEventListener('pointermove', UPDATE);
//
//     const RESTYLE = () => {
//       if (CONTAINER) { // Verificar si CONTAINER no es null
//         CONTAINER.style.setProperty('--gap', `${CONFIG.gap}px`);
//         CONTAINER.style.setProperty('--blur', `${CONFIG.blur}px`);
//         CONTAINER.style.setProperty('--spread', `${CONFIG.spread}px`);
//         CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');
//       }
//     };
//
//     const CTRL = {
//       width: 340,
//       add: (obj: any, prop: string, min: number, max: number, step: number) => {
//         return {
//           name: (label: string) => {
//             return {
//               onChange: (callback: () => void) => {
//                 // Mock onChange function
//               }
//             };
//           }
//         };
//       }
//     };
//
//     CTRL.add(CONFIG, 'spread', 10, 180, 1).name('Spread (deg)').onChange(RESTYLE);
//     CTRL.add(CONFIG, 'proximity', 10, 180, 1).name('Active Proximity (px)').onChange(RESTYLE);
//     CTRL.add(CONFIG, 'gap', 10, 100, 1).name('Gap (px)').onChange(RESTYLE);
//     CTRL.add(CONFIG, 'blur', 0, 50, 1).name('Blur (px)').onChange(RESTYLE);
//     CTRL.add(CONFIG, 'opacity', 0, 1, 0.01).name('Inactive Opacity').onChange(RESTYLE);
//     CTRL.add(CONFIG, 'vertical').name('Vertical Layout').onChange(RESTYLE);
//
//     RESTYLE();
//     UPDATE();
//   }
// }



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const CONTAINER = document.querySelector('.container') as HTMLElement;
    const CARDS = document.querySelectorAll('article');

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 20,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const PROXIMITY = 10;

    const UPDATE = (event: MouseEvent) => {
      for (const CARD of Array.from(CARDS)) { // Convertir a Array.from para asegurar compatibilidad con NodeList
        const CARD_BOUNDS = (CARD as HTMLElement).getBoundingClientRect();

        if (
          event.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          (CARD as HTMLElement).style.setProperty('--active', '1');
        } else {
          (CARD as HTMLElement).style.setProperty('--active', CONFIG.opacity.toString());
        }

        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5
        ];
        let ANGLE = Math.atan2(event.y - CARD_CENTER[1], event.x - CARD_CENTER[0]) * 180 / Math.PI;
        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
        (CARD as HTMLElement).style.setProperty('--start', `${ANGLE + 90}`);
      }
    };

    document.body.addEventListener('pointermove', UPDATE);

    const RESTYLE = () => {
      if (CONTAINER) {
        CONTAINER.style.setProperty('--gap', `${CONFIG.gap}px`);
        CONTAINER.style.setProperty('--blur', `${CONFIG.blur}px`);
        CONTAINER.style.setProperty('--spread', `${CONFIG.spread}px`);
        CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');
      }
    };

    RESTYLE();
  }
}

