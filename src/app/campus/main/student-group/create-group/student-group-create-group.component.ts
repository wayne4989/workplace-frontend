import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusStudentGroupModel
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
  MessageNotificationService,
  NotificationTypes
} from '../../../../../services';
import {
  Location
} from '@angular/common';

@Component({
   selector: 'campus-student-group-create-group-component',
  templateUrl: './student-group-create-group.component.html',
  styleUrls: ['./student-group-create-group.component.scss']
})
export class CampusStudentGroupCreateGroupComponent implements OnInit {
  constructor (
    private campusApiService: CampusApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  protected campusStudentGroup: CampusStudentGroupModel = new CampusStudentGroupModel();
  protected campusId: number;
  protected isToogleUploadComponentVisible: boolean = false;
  protected isCreateGroupButtonClicked: boolean = false;

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });
  }

  protected onUploadComplete (logo): void {
    this.campusStudentGroup.logo = logo[0].cloudinaryPublicId;
    this.postCampusStudentGroupData();
  }

  protected onCreateGroup (): void {
    this.isCreateGroupButtonClicked = true;

    MessageNotificationService.show({
      notification: {
        id: 'create-student-group-please-wait',
        message: 'Creating group',
        instruction: 'Please wait...'
      }
    },
    NotificationTypes.Info);
    if (this.isToogleUploadComponentVisible) {
      return PostEmitter.uploadImages().emit();
    }
      this.postCampusStudentGroupData();
  }

  private postCampusStudentGroupData (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseCreateStudentGroup(campusId, this.campusStudentGroup)
    .then(() => {
      this.isCreateGroupButtonClicked = false;
      MessageNotificationService.show({
        notification: {
          id: 'create-student-group-success',
          message: 'Student group has been created.',
          instruction: ''
        }
      },
      NotificationTypes.Success).then(() => {
        // navigate to landing
        this.location.back();
      });
    })
    .catch((error) => {
      this.isCreateGroupButtonClicked = false;
      if (error.error.status_code === 101) {
        MessageNotificationService.show({
          notification: {
            id: 'cannot-create-student-group',
            message: 'Cannot create student group',
            instruction: 'Group Name, Description and Admin Email are required.'
          }
        },
        NotificationTypes.Error);
      } else if (error.error.status_code === 102) {
        MessageNotificationService.show({
          notification: {
            id: 'cannot-create-student-group',
            message: 'Cannot create student group',
            instruction: 'Invalid email.'
          }
        },
        NotificationTypes.Error);
      }
    });
  }

}
