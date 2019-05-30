import {
  EventEmitter
} from '@angular/core';
import {
  EmitterService
} from './emitter.component';

export class OnBoardingEmitter {
  constructor () {}

  public static getOnboardingName (): string {
    return 'getOnBoardingCurrentRoute';
  }

  public static onBoardingCurrentRoute (): any {
    return EmitterService.get('getOnBoardingCurrentRoute');
  }

  public static removeSubscriber (channel): void {
    EmitterService.remove(channel);
  }
}
