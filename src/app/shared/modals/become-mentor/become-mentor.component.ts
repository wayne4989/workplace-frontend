import {
	Component,
  OnInit,
  Inject,
  Input
} from '@angular/core';
import {
	Router
} from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  CryptoUtilities
} from '../../../shared/utilities';

@Component({
	selector: 'become-a-mentor-modal-component',
	templateUrl: './become-mentor.component.html',
	styleUrls: ['./become-mentor.component.scss']
})
export class BecomeMentorModalComponent implements OnInit {
	constructor (
    @Inject(MAT_DIALOG_DATA) protected postDetailData: any,
    private router: Router,
    private dialog: MatDialog
	) {}

  public ngOnInit (): void {}

}
