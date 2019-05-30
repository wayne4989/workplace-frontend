import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';

@Component({
   selector: 'campus-admin-post-announcement-component',
  templateUrl: './post-announcement.component.html',
  styleUrls: ['./post-announcement.component.scss']
})
export class CampusAdminPostAnnouncementComponent implements OnInit {
  constructor (private route: ActivatedRoute) {}

  public ngOnInit (): void {}
}
