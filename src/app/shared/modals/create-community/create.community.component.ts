import {
	Component,
	OnInit,
  Inject,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  PrivateCommunityModel,
  UserModel
} from '../../../shared/models';
import {
  CommunityApiService,
  AdvanceSearchService
} from '../../../../services/api';
import { StringifyOptions } from 'querystring';

@Component({
	selector: 'create-community-modal-component',
	templateUrl: './create.community.component.html',
	styleUrls: ['./create.community.component.scss']
})
export class CreateCommunityComponent implements OnInit {
	constructor (
    @Inject(MAT_DIALOG_DATA) protected comunityDetailData: any,
		private dialog: MatDialog,
    private communityApiService: CommunityApiService,
    private advanceSeachService: AdvanceSearchService
	) {}

  protected privateCommunity: PrivateCommunityModel = new PrivateCommunityModel;
  protected keyword: string = '';
  protected searchedUsers: Array<UserModel> = [];
  private timer: any;
  private selectedUsers: Array<UserModel> = [];

	public ngOnInit (): void {}

	protected onSubmit (valid): void {
		console.log(this.privateCommunity);
		this.communityApiService.promiseCreatePrivateCommunity(this.privateCommunity)
		.then(() => {
      this.dialog.closeAll();
    })
		.catch(error => {
			console.log(error);
		});
	}

  protected onSearchUser (): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.advanceSeachService.promiseGetAllSearchedUsers(this.keyword)
      .then(response => {
        this.searchedUsers = response;
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }, 500);
  }

  protected onResultSelected (item: UserModel, index): void {
    if (this.privateCommunity.communityUsers.indexOf(item.id.toString()) === -1) {
      this.privateCommunity.communityUsers.push(item.id.toString());
      this.selectedUsers.push(item);

      this.searchedUsers.splice(index, 1);
    }
  }

  protected onClearSelected (index): void {
    this.selectedUsers.splice(index, 1);
    this.privateCommunity.communityUsers.splice(index, 1);
  }
}
