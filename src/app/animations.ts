import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */
    query(':enter, :leave', style({
      position: 'fixed', width: '100%'
    }), {
      optional: true
    }), /* 2 */
    group([  // block executes in parallel
      query(':enter', [
       style({ opacity: 0 }),
        animate(800, style({ opacity: 1 }))
      ], {
        optional: true
      }),
      query(':leave', [
       animate(800, style({ opacity: 0 }))
      ], { optional: true })
    ])
  ])
]);
