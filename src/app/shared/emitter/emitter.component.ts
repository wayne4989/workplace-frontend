import {
  Injectable,
  EventEmitter
} from '@angular/core';

@Injectable()
export class EmitterService {
  public static emitters: { [channel: string]: EventEmitter<any> } = {};

  public static get (channel: string): EventEmitter<any> {
    if (!this.emitters[channel]) {
      this.emitters[channel] = new EventEmitter();
    }
    return this.emitters[channel];
  }

  public static remove (channel: string): any {
    if (this.emitters[channel]) {
      this.emitters[channel].unsubscribe();
      delete this.emitters[channel];

      return this.emitters[channel];
    }
  }

  public static clear (channel): any {
    let self = this;
    for (let i = 0; i < channel.length; i++) {
      /** */
      if (self.emitters[channel[i]] && self.emitters[channel[i]].unsubscribe) {
        self.emitters[channel[i]].unsubscribe();
        delete self.emitters[channel[i]];
        return self.emitters[channel[i]];
      }
    }

    return false;
  }
}
