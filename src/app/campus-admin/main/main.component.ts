import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';

@Component({
   selector: 'campus-admin-main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class CampusAdminMainComponent implements OnInit {
  constructor (private route: ActivatedRoute) {}

  public ngOnInit (): void {}
}
