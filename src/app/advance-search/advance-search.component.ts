import {
  Component
} from '@angular/core';
import { AdvanceSearchFindPeopleComponent } from './find-people/find-people.component';
import { UserModel, AdvanceSearchModel } from '../shared/models';
import { CryptoUtilities } from '../shared/utilities';
import { UserService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'advance-search-component',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent {
  constructor (
    private router: Router
  ) {}

  protected results: Array<UserModel|AdvanceSearchModel>;
  protected findAll: boolean = true;
  protected findPeople: boolean = false;
  protected findPost: boolean = false;

  protected receivedResults (emittedResults: Array<UserModel|AdvanceSearchModel>): void {
    this.results = emittedResults;
    console.log('received', this.results);
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }
}
