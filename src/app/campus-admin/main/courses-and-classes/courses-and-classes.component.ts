import {
  Component,
  OnInit
} from '@angular/core';

@Component({
   selector: 'campus-admin-courses-and-classes-component',
  templateUrl: './courses-and-classes.component.html',
  styleUrls: ['./courses-and-classes.component.scss']
})
export class CampusAdminCoursesAndClassesComponent implements OnInit {
  constructor () {}

  protected toggleClass: boolean = true;

  public ngOnInit (): void {}

}
