	/**
	 * This component would be used to get and display user-ratings
	**/
import {
	Component,
	OnInit,
	Input
} from '@angular/core';
import {
	UserModel
} from '../../models';
import {
	UserApiService
} from '../../../../services/api';

@Component({
	selector: 'shared-user-rating',
	templateUrl: './user-rating.component.html',
	styleUrls: ['./user-rating.component.scss']
})
export class SharedUserRatingComponent implements OnInit {
	constructor (private userApiService: UserApiService) {}
  @Input() protected userCredits: {totalCredits: number};
	protected userCreditsRatingPercentage: string = '20%';

	public ngOnInit (): void {
		if (!this.userCredits) { return; }
		switch (true) {
			case (this.userCredits.totalCredits < 500) :
				this.userCreditsRatingPercentage = '20%';
			break;
			case (this.userCredits.totalCredits >= 500 && this.userCredits.totalCredits <= 1199) :
				this.userCreditsRatingPercentage = '40%';
			break;
			case (this.userCredits.totalCredits >= 1200 && this.userCredits.totalCredits <= 1999) :
				this.userCreditsRatingPercentage = '50%';
			break;
			case (this.userCredits.totalCredits >= 2000 && this.userCredits.totalCredits <= 2999) :
				this.userCreditsRatingPercentage = '60%';
			break;
			case (this.userCredits.totalCredits >= 3000 && this.userCredits.totalCredits <= 3999) :
				this.userCreditsRatingPercentage = '70%';
			break;
			case (this.userCredits.totalCredits >= 4000 && this.userCredits.totalCredits <= 5999) :
				this.userCreditsRatingPercentage = '80%';
			break;
			case (this.userCredits.totalCredits >= 6000 && this.userCredits.totalCredits <= 7999) :
				this.userCreditsRatingPercentage = '90%';
			break;
			case (this.userCredits.totalCredits >= 8000) :
				this.userCreditsRatingPercentage = '100%';
			break;
		}
	}
}
