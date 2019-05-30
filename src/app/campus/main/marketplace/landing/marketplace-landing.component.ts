import {
  Component,
  OnInit
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
  CampusMarketplaceModel
} from '../../../../shared/models';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-marketplace-landing-component',
  templateUrl: './marketplace-landing.component.html',
  styleUrls: ['./marketplace-landing.component.scss']
})
export class CampusMarketplaceLandingComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService,
    private router: Router
  ) {}

  protected campusId: number;
  protected myCampusMarketPlace: CampusMarketplaceModel[] = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
      this.getMarketPlace();
    });
  }

  private getMarketPlace (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetMarketplace(campusId)
    .then((campusMarketPlace: CampusMarketplaceModel[]) => {
      this.myCampusMarketPlace = campusMarketPlace;
    });
  }

  protected onGetItemDetails (itemId): void {
    const encryptedItemId = CryptoUtilities.cipher(itemId);
    this.router.navigate([`../${encryptedItemId}`], {relativeTo: this.route});
  }
}
