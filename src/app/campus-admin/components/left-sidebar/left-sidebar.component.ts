import {
  Component
} from '@angular/core';

@Component({
  selector: 'campus-admin-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class CampusAdminLeftSidebarComponent {
  constructor () {}

  protected groupManagementToggle: boolean = false;
  protected courseToggle: Object = {
    engineering: false,
    finance: false,
    math: false,
    geography: false
  };

  protected toggle (course): void {
    this.courseToggle[course] = !this.courseToggle[course];
  }

}
