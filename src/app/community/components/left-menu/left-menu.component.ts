import {
  Component,
  Input
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';

@Component({
  selector: 'community-left-menu-component',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class CommunityLeftMenuComponent {
  constructor (public dialog: MatDialog) {}

  @Input() protected page: string;
  protected isCollapsed = true;

  public ngOnInit (): void {}
}
