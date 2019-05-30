import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  AdvanceSearchService
} from '../../../services/api';

@Component({
  selector: 'advance-find-people-component',
  templateUrl: './find-people.component.html',
  styleUrls: ['./find-people.component.scss']
})
export class AdvanceSearchFindPeopleComponent {
  constructor (
    private advanceSeachService: AdvanceSearchService
  ) {}

  @Output() private userSearchEvent: EventEmitter<any> = new EventEmitter<any>();
  protected lastName: string;
  protected campusName: string = '';

  protected onSearchUsers (): void {
    this.advanceSeachService.promiseGetAllSearchedUsers(this.lastName, this.campusName)
      .then(response => {
        this.userSearchEvent.emit(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
