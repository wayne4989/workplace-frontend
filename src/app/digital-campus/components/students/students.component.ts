import {
  Component
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes,
  state
} from '@angular/animations';

@Component({
  selector: 'digital-campus-students-component',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: [
 trigger('visibilityChanged', [
   state('shown' , style({ opacity: 1 })),
   state('hidden', style({ opacity: 0 })),
   transition('* => *', animate('.5s'))
 ])
]
})
export class DigitalCampusStudentsComponent {
  constructor () {}

  protected collaboration: boolean = false;
}
