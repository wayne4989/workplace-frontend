import {
  Component,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserModel
} from '../../../shared/models';
import{
  UserApiService
} from '../../../../services/api/user.api.service';

@Component({
  selector: 'home-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class HomeLeftSidebarComponent {
  constructor (
    private userApiService: UserApiService,
    private router: Router,
  ) {}

  @Input() protected user: UserModel;

  protected onClickUserProfile (): Promise<boolean> {
    return this.router.navigate([`/profile`]);
  }
}
