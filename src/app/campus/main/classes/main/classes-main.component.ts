import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusClassPostModel
} from '../../../../shared/models';
import {
  CampusApiService
} from '../../../../../services/api/campus.api.service';
import {
  CryptoUtilities
} from '../../../../shared/utilities';
import {
	CampusClassModel
} from '../../../../shared/models';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../../services';

@Component({
  selector: 'campus-classes-main-component',
  templateUrl: './classes-main.component.html',
  styleUrls: ['./classes-main.component.scss']
})
export class CampusClassesMainComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected courseId: number;
  protected campusClassList: Array<any> = [];
  private campusCourseClassIds: Array<any> = [];
  protected onProceedButtonIsEnabled: boolean = true;

  public ngOnInit (): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = params.id;
      this.getClassList();
    });
  }

  private getClassList (): void {
    this.courseId = parseInt(CryptoUtilities.decipher(this.courseId), 10);
    this.campusApiService.promiseGetAllClassList(this.courseId)
      .then((campusClassList: CampusClassModel[]) => {
        this.campusClassList = campusClassList;
      });
  }

  protected onClickAddClass (event): void {
    let classId = parseInt(event.target.id, 10);

    if (event.target.checked === true) {
       this.campusCourseClassIds.push(classId);
    } else {
      // Remove class if unclicked
      const index: number = this.campusCourseClassIds.indexOf(classId);
      if (index !== -1) {
        this.campusCourseClassIds.splice(index, 1);
      }
    }
    // Cannot Select more than 7 classes
    if (this.campusCourseClassIds.length > 7) {
      MessageNotificationService.show({
        notification: {
          id: 'cannot-add-classes',
          message: 'Cannot add more than Seven(7) classes',
          instruction: 'Please select seven or less...'
        }
      },
      NotificationTypes.Warning);
    }
  }

  protected onClickProceed (): void {
    MessageNotificationService.show({
      notification: {
        id: 'save-classes-please-wait',
        message: 'Saving...',
        instruction: 'Please wait...'
      }
    },
    NotificationTypes.Info);
    this.onProceedButtonIsEnabled = false;

    this.campusApiService.promiseCreateCampusCourseClassIds(this.campusCourseClassIds)
      .then(_ => {
        this.onProceedButtonIsEnabled = true;
      })
      .catch((error) => {
        this.onProceedButtonIsEnabled = true;
        console.log('Error', error);
        MessageNotificationService.show({
          notification: {
            id: 'save-classes-error',
            message: 'Unable to Save Class/es.',
            instruction: 'Please try again.'
          }
        },
        NotificationTypes.Error);
      });
  }
}
