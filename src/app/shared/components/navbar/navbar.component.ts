import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'shared-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class SharedNavBarComponent implements OnInit {
  constructor () {}

  @Input('active') protected active: string;
  private notifications: any[] = [];
  private messages: any[] = [];
  private userMenuOpen = false;
  private searchOpen = false;
  private messagesOpen = false;
  private notificationOpen = false;
  private user: any;

  public ngOnInit (): void {}
  //   this.getUserProfile();
  //   this.notificationService.getNotifications(1, 5).subscribe(resp => {
  //     if (resp['error'] === false) {
  //       this.notifications = resp['Notifications'];
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  //   this.notificationService.getMessages(1, 5).subscribe(resp => {
  //     if (resp['error'] === false) {
  //       this.messages = resp['Messages'];
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  //   $('body')
  //     .removeClass('_bg_white')
  //     .addClass('_bg_gray');
  // }
  //
  // public openRightMenu (variable): void {
  //   const oldCondition = this[variable];
  //   this.userMenuOpen = false;
  //   this.searchOpen = false;
  //   this.messagesOpen = false;
  //   this.notificationOpen = false;
  //   this[variable] = !oldCondition;
  // }
  //
  // private getUserProfile (): void {
  //   let user = localStorage.getItem('user');
  //   let userInfo = JSON.parse(user);
  //   let userId = userInfo.id;
  //   this.accountSettingService.getUserProfile()
  //     .subscribe((response: any) => {
  //       this.user = response.user;
  //       console.log(this.user);
  //     }, error => {
  //       console.log(error);
  //     });
  // }
}
