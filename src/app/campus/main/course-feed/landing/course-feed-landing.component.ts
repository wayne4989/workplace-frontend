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
  CampusCourseModel
} from '../../../../shared/models';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-course-feed-landing-component',
  templateUrl: './course-feed-landing.component.html',
  styleUrls: ['./course-feed-landing.component.scss']
})
export class CampusCourseFeedLandingComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected campusCourseList: Array<any> = [];
  protected alphabets = [];
  protected selectedLetter: string = 'All';
  protected filterResults = [];
  protected onFilter: boolean = false;

  public ngOnInit (): void {
    for (let i = 65; i <= 90; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }

    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;

      this.getCourseList();
    });
  }

  private getCourseList (): void {
    this.campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllCampusCourse(this.campusId)
      .then((campusCourseList: CampusCourseModel[]) => {
        this.campusCourseList = campusCourseList;
      });
  }

  protected onClickNavigate (courseFeedId): void {
    const encryptedCourseFeedId = CryptoUtilities.cipher(courseFeedId);
    this.router.navigate([`../${encryptedCourseFeedId}`], {relativeTo: this.route});
  }

  protected onSelectedLetter (letter): void {
    this.selectedLetter = letter;

    if (this.selectedLetter === 'All') {
      this.onFilter = false;
    } else {
      this.onFilter = true;

      this.filterResults = [];
      for (let i = 0; i < this.campusCourseList.length; i++) {
        if (this.campusCourseList[i].course.name.indexOf(this.selectedLetter) === 0) {
          this.filterResults.push(this.campusCourseList[i]);
        }
      }
    }
  }
}
