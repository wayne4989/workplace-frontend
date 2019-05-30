import {
	Component
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
	BecomeMentorModalComponent,
	MentorModalComponent
} from '../../../shared/modals';
import {
	MentorModel
} from '../../../shared/models';

@Component({
	selector: 'campus-mentoring-component',
	templateUrl: './mentoring.component.html',
	styleUrls: ['./mentoring.component.scss']
})
export class CampusMentoringComponent {
	constructor (
		private dialog: MatDialog,
    private overlay: Overlay
	) {}

	protected mentors = [{
		id: 1,
		firstName: 'Paul',
		lastName: 'Molive',
		expertise: 'Economics, Arts',
		contactDetals: '0288172938',
		reasonForBecomingAMentor: 'I find mentoring fulfilling.'
	}, {
		id: 2,
		firstName: 'Anna',
		lastName: 'Wayne',
		expertise: 'Mathematics, Science',
		contactDetals: '028835485',
		reasonForBecomingAMentor: 'Helping has been my passion.'
	}, {
		id: 3,
		firstName: 'Gail',
		lastName: 'Forcewind',
		expertise: 'Literature, Programming',
		contactDetals: '0241285',
		reasonForBecomingAMentor: 'Knowledge is like a lamp, let it shine upon other.'
	}];

	public ngOnInit (): void {}

	protected onBecomeAMentor (): void {
    let dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'become-a-mentor-modal';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
		this.dialog.open(BecomeMentorModalComponent, dialogConfig);
	}

	protected onClickMentorName (data): void {
		let dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'mentor-details-modal';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
		dialogConfig.data = {data};
		this.dialog.open(MentorModalComponent, dialogConfig);
	}
}
