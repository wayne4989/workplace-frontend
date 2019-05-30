import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  OnBoardingEmitter
} from '../../shared/emitter';
import {
  routerTransition
} from '../../animations';

@Component({
  selector: 'user-on-boarding-component',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss'],
  animations: [routerTransition]
})
export class UserOnboardingComponent {
  constructor (
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.onBoardingEmitterSubscriber();
  }

  protected steps: Array<string> = [];

  public ngOnDestroy (): void {
    OnBoardingEmitter.removeSubscriber(OnBoardingEmitter.getOnboardingName());
  }

  protected getState (outlet): void {
    return outlet.activatedRouteData.state;
  }

  private onBoardingEmitterSubscriber (): void {
    OnBoardingEmitter
    .onBoardingCurrentRoute()
    .subscribe((data) => {
      this.steps = data;
      this.changeDetectorRef.detectChanges();
    });
  }
}

