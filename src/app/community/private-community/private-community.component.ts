import {
	Component
} from '@angular/core';
import {
	ActivatedRoute,
	Params
} from '@angular/router';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
	CreateCommunityComponent
} from '../../shared/modals';
import {
  CommunityApiService
} from '../../../services/api';
import {
  PrivateCommunityModel
} from '../../shared/models';
@Component({
	selector: 'private-community-component',
	templateUrl: './private-community.component.html',
	styleUrls: ['./private-community.component.scss']
})
export class PrivateCommunityComponent {
	constructor (
		private dialog: MatDialog,
    private overlay: Overlay,
    private communityApiService: CommunityApiService
	) {}

  protected selectedCommunitySelected: string = 'discoverCommunity';
  protected communities: Array<PrivateCommunityModel> = [];

  public ngOnInit (): void {
    this.communityApiService.promiseGetAllPrivateCommunityData()
      .then(response => {
        // console.log('get privates', response);
        this.communities = response;
      })
      .catch(error => {
        // console.log('get privates', error)
      });
  }

	protected onSelectCommunityType (type): void {
		this.selectedCommunitySelected = type;
	}

	protected onCreateCommunity (): void {
		let dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'create-community-modal';
		dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
		this.dialog.open(CreateCommunityComponent, dialogConfig);
  }
}
