import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  OnBoardingEmitter
} from '../../../shared/emitter';

@Component({
  selector: 'user-on-boarding-select-status-component',
  templateUrl: './select-status.component.html',
  styleUrls: ['./select-status.component.scss']
})
export class UserOnboardingSelectStatusComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
  ) {}

  public ngOnInit (): void {
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }
}
