import {
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../services/api/campus.api.service';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
	CampusClassModel
} from '../../../shared/models';

@Component({
  selector: 'campus-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class CampusLeftSidebarComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService,
    private router: Router
  ) {}

  protected isDropdowmClassesIsOpen: boolean = true;
  protected campusId: number;
  protected campusClassList: Array<any> = [];
  protected selectedClassId: number;

  public ngOnInit (): void {
    this.route.params.subscribe((params: Params) => {
      this.campusId = params.id;
      this.getClassList();
    });
  }
  private getClassList (): void {
    this.campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllClassList(this.campusId)
      .then((campusClassList: CampusClassModel[]) => {
        this.campusClassList = campusClassList;
      });
  }

  protected onSelectClass (classId): void {
    this.selectedClassId = classId;

    const encryptedCampusId = CryptoUtilities.cipher(this.campusId);
    const encryptedClassId = CryptoUtilities.cipher(classId);
    let navigationExtras = {
      classId: encryptedClassId,
      campusId:  encryptedCampusId
    };

    this.router.navigate([`../${encryptedCampusId}/class-posts`],  {queryParams: navigationExtras, relativeTo: this.route});
  }
}
