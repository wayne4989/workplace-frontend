import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  UserModel
} from '../../../shared/models';
import {
  UserApiService
} from '../../../../services/api';
import {
  CryptoUtilities
} from '../../../shared/utilities';

@Component({
  selector: 'profile-left-sidebar-user-other-info-component',
  templateUrl: './user-other-info.component.html',
  styleUrls: ['./user-other-info.component.scss']
})
export class ProfileLeftSidebarUserOtherInfoComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private userApiService: UserApiService
  ) {}

  @Input() protected user: UserModel;
  @Input() protected isUserProfile;

  private userId: string;

  public ngOnInit (): void {}
}
