import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sending-button-icon',
  templateUrl: './sending-button-icon.component.html',
  styles: [],
})
export class SendingButtonIconComponent {
  @Input()
  public isSending = false;
}
