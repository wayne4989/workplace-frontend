import {
	Component,
	Input
} from '@angular/core';
import {
	ActivatedRoute,
	Params
} from '@angular/router';
import {
  CampusClassPostModel,
} from '../../../shared/models';
import {
  CampusApiService
} from '../../../../services/api';
import {
  CryptoUtilities
} from '../../../shared/utilities';

@Component({
	selector: 'class-post-component',
	templateUrl: './class-posts.component.html',
	styleUrls: ['./class-posts.component.scss']
})

export class ClassPostComponent {
	constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
	) { }
  protected campusId: number;
	protected campusclassId: number;
  protected campusClass: CampusClassPostModel[] = [];
  protected selectedPostType: string = 'timeline';

  public ngOnInit (): void {
		this.route.queryParams.subscribe((queryParams) => {
			this.campusclassId = queryParams.classId;
			this.campusId = queryParams.campusId;
			this.getCampusClassesPosts();
		});
	}

  private getCampusClassesPosts (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    let campusClassId = parseInt(CryptoUtilities.decipher(this.campusclassId), 10);
    this.campusApiService.promiseGetAllClassPost(campusId, campusClassId)
      .then((campusClass: CampusClassPostModel[]) => {
				this.campusClass = campusClass;
      })
      .catch(() => {});
  }
}
