import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserModel
} from '../shared/models';

@Component({
  selector: 'community-component',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  constructor () {}

  protected message: string;

  public ngOnInit (): void {}
}
