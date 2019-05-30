import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  CampusApiService
} from '../../../services/api/campus.api.service';
import {
  CampusFactory
} from '../../shared/models/campus.factory';
import {
  CampusModel
} from '../../shared/models';
import {
  IResponse
} from '../../shared/models';
import {
  CryptoUtilities
} from '../../shared/utilities';

@Component({
  selector: 'campus-landing-page-component',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class CampusLandingPageComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campuses: Array<CampusModel> = [];
  private campus: CampusModel;

  public ngOnInit (): void {
    this.campusApiService.getCampuses()
      .then((responseData: CampusModel[]) => {
        this.campuses = responseData;
      });
  }

  protected onSelectedCampus (value: string): void {
    const index = this.campuses.findIndex((campus: CampusModel) => campus.id === parseInt(value, 10));
    this.campus = this.campuses[index];
  }

  protected onJoinWithInstitution (): void {
    const campusId = CryptoUtilities.cipher(this.campus.id);
    this.router.navigate([`${campusId}/all-students`], {relativeTo: this.route});
  }
}
