import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-pill',
  templateUrl: './ui-pill.component.html',
  styleUrls: ['./ui-pill.component.scss']
})
export class UiPillComponent implements OnInit {
  @Input() uiPillContent: string;
  @Input() uiPillColor: string;
  @Input() uiPillIcon: string;
  public pillType: string;

  constructor() {}

  ngOnInit() {
    console.log(this.uiPillColor);
    if (this.uiPillColor) {
      return (this.pillType = this.getColorFromContent(this.uiPillColor));
    }
    this.pillType = this.getColorFromContent(this.uiPillContent);
  }

  private getColorFromContent(content): string {
    let color;
    switch (content) {
      case 'severe':
        color = 'danger';
        break;
      case 'easy':
        color = 'success';
        break;
      case 'moderate':
        color = 'warning';
        break;
      default:
        color = 'default';
    }
    return color;
  }
}
