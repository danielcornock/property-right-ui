import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-icon',
  templateUrl: './avatar-icon.component.html',
  styleUrls: ['./avatar-icon.component.scss']
})
export class AvatarIconComponent implements OnInit {
  @Input() avatarIcon: string;
  constructor() {}

  ngOnInit() {
    console.log(this.avatarIcon);
  }
}
