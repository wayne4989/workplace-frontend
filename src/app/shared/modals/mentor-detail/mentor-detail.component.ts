import {
	Component,
	OnInit,
	Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
	selector: 'mentor-detail-modal-component',
	templateUrl: './mentor-detail.component.html',
	styleUrls: ['./mentor-detail.component.scss']
})
export class MentorModalComponent implements OnInit {
	constructor (
    @Inject(MAT_DIALOG_DATA) protected mentorDetailData: any,
    private dialog: MatDialog
	) {}

	public ngOnInit (): void {}
}
