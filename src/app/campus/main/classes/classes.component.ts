import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusFreshersFeedModel
} from '../../../shared/models';
import {
  CampusApiService
} from '../../../../services/api';

@Component({
   selector: 'campus-classes-component',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class CampusClassesComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;

  public ngOnInit (): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });
  }
}
