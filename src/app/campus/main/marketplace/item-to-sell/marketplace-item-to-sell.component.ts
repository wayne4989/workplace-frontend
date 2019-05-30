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
  CampusMarketplaceModel
} from '../../../../shared/models';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CryptoUtilities
} from '../../../../shared/utilities';
import {
  PostEmitter
} from '../../../../shared/emitter';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  SharedConfirmModalComponent
} from '../../../../shared/modals/confirm/confirm-modal.component';

@Component({
  selector: 'campus-marketplace-item-to-sell-component',
  templateUrl: './marketplace-item-to-sell.component.html',
  styleUrls: ['./marketplace-item-to-sell.component.scss']
})
export class CampusMarketplaceItemToSellComponent {
  constructor (
    private campusApiService: CampusApiService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) { }

  protected campusMarketPlace: CampusMarketplaceModel = new CampusMarketplaceModel();
  protected campusId: number;
  private hasImageSelected: boolean = false;
  protected isBtnCreateAdDisabled: boolean;

  public ngOnInit (): void {
    this.isBtnCreateAdDisabled = true;
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });
  }

  protected onSubmit (formIsValid): void {
    if (formIsValid) {
      this.isBtnCreateAdDisabled = false;
      if (this.hasImageSelected) {
        PostEmitter.uploadImages().emit();
      } else {
        this.createMarketPlaceItemToSell();
      }
    }
  }

  protected onUploadComplete (attachments): void {
    this.campusMarketPlace.attachments =  attachments;
    this.createMarketPlaceItemToSell();
  }

  protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
  }

  private createMarketPlaceItemToSell (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseCreateMarketplace(campusId, this.campusMarketPlace)
      .then((_) => {
        this.isBtnCreateAdDisabled = true;
        this.router.navigate(['../landing'], { relativeTo: this.route});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  protected onShowCancelMessage (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'cancel-saving-ad-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.id = 'SharedConfirmModalComponent';
    dialogConfig.data = {
     description : 'Are you sure you want to cancel?'
    };
    this.dialog.open(SharedConfirmModalComponent, dialogConfig)
    .beforeClose()
    .subscribe(response => {
      if (response) {
        this.router.navigate(['../landing'], { relativeTo: this.route});
      }
    });
  }
}
