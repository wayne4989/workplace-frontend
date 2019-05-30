import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CampusStudentGroupModel
} from '../../../../shared/models';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-student-group-landing-component',
  templateUrl: './student-group-landing.component.html',
  styleUrls: ['./student-group-landing.component.scss']
})
export class CampusStudentGroupLandingComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;

  protected myCampusStudentGroup: CampusStudentGroupModel[] = [];
  protected publicCampusStudentGroup: CampusStudentGroupModel[] = [];
  protected secretCampusStudentGroup: CampusStudentGroupModel[] = [];
  protected selectedGroupType: string = 'public';

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;

      this.getSecretGroup();
      this.getMyPrivateGroup();
      this.getPublicGroup();
    });
  }

  private getSecretGroup (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllStudentGroup(campusId, false, 10, 0, 3)
      .then((campusStudentGroup: CampusStudentGroupModel[]) => {
        this.secretCampusStudentGroup = campusStudentGroup;
      });
  }

  private getMyPrivateGroup (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllStudentGroup(campusId, true, 10, 0, 2)
      .then((campusStudentGroup: CampusStudentGroupModel[]) => {
        this.myCampusStudentGroup = campusStudentGroup;
      });
  }

  private getPublicGroup (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllStudentGroup(campusId, false, 10, 0, 1)
      .then((campusStudentGroup: CampusStudentGroupModel[]) => {
        this.publicCampusStudentGroup = campusStudentGroup;
      });
  }

  protected onSelectGrouptype (type): void {
    this.selectedGroupType = type;
  }
}
