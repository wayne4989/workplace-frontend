import {
  Component,
  OnInit
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import {
  MessageNotificationService
} from '../services';
import {
  routerTransition
} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  constructor (private titleService: Title) {}

  protected loading: boolean;
  protected messageNotificationService: Array<any> = [];

  public ngOnInit (): void {
    MessageNotificationService.onShow.subscribe((messageNotification) => {
      this.messageNotificationService = [];
      for (let id of Object.keys(messageNotification.notifications)) {
        this.messageNotificationService.push(messageNotification.notifications[id]);
      }
    });
  }

  protected getState (outlet): void {
    return outlet.activatedRouteData.state;
  }

  protected getTitle (state, parent): any {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }

    return data;
  }
}
