import {
  EventEmitter
} from '@angular/core';
import {
  EmitterService
} from './emitter.component';

export class EmitterUtils {
  constructor () {}

  public static getGlobalScrollspyName (): string {
    return 'globalScrollspy';
  }

  public static globalScrollspy (): any {
    return EmitterService.get('globalScrollspy');
  }

  public static removeSubscriber (channel): void {
    EmitterService.remove(channel);
  }
}
