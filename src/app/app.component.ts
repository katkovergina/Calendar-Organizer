import { Component } from '@angular/core';
import { DateService } from './shared/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(public dateService: DateService) {}

  toNow() {
    this.dateService.toNow()
  }
}
