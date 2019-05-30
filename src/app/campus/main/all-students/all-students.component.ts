import {
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusPostModel,
  UserModel
} from '../../../shared/models';
import {
  CampusApiService
} from '../../../../services/api';
import {
  UserService
} from '../../../../services';
import {
  CryptoUtilities
} from '../../../shared/utilities';

@Component({
  selector: 'campus-all-students-component',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class CampusAllStudentsComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected posts: Array<CampusPostModel> = [];
  protected user: UserModel = UserService.getUser();
  protected campusId: number;
  protected contentTypeOnMobile: string = 'timeline';

  public ngOnInit (): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
      this.getCampusPosts();
    });
  }

  private getCampusPosts (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllPost(campusId)
      .then((campusPost: CampusPostModel[]) => {
        this.posts = campusPost;
      })
      .catch((error) => {});
  }

  protected onMobileContentSelect (type): void {
    this.contentTypeOnMobile = type;
  }
}
