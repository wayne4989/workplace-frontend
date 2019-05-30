import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'shared-navbar-unauth-component',
  templateUrl: './navbar-unauth.component.html',
  styleUrls: ['./navbar-unauth.component.scss']
})
export class SharedNavbarUnauthComponent {
  constructor () {}

  @Input() protected aboutUs: boolean;
  @Input() protected digitalCampus: boolean;
  @Input() protected blog: boolean;
  @Input() protected press: boolean;
  @Input() protected signIn: boolean;
  @Input() protected signUp: boolean;
}
