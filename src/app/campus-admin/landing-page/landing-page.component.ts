import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'campus-admin-landing-page-component',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class CampusAdminLandingPageComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit (): void {}

  protected onSelectInstitution (): void {
    // const campusId = CryptoUtilities.cipher(this.campus.id);
    this.router.navigate([`97/dashboard`], {relativeTo: this.route});
  }
}
