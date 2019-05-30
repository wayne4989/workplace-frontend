import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CampusFreshersFeedModel
} from '../../../../shared/models';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-freshers-feed-landing-component',
  templateUrl: './freshers-feed-landing.component.html',
  styleUrls: ['./freshers-feed-landing.component.scss']
})
export class CampusFreshersFeedLandingComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected freshersFeed: Array<any> = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;

      this.getAllFreshersFeed();
    });
  }

  private getAllFreshersFeed (): void {
    this.campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.getAllFreshersFeed(this.campusId)
      .then((campusFreshersFeed: CampusFreshersFeedModel[]) => {
        this.freshersFeed = campusFreshersFeed;
      })
      .catch(() => {});
  }

  protected onClickNavigate (freshersFeedId): void {
    const encryptedFreshersFeedId = CryptoUtilities.cipher(freshersFeedId);
    this.router.navigate([`../${encryptedFreshersFeedId}`], {relativeTo: this.route});
  }
}
