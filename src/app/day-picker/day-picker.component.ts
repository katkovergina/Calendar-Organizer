import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.less']
})
export class DayPickerComponent {

  constructor(public dateService: DateService) { }

  go(dir: number) {
    this.dateService.switchDay(dir)
  }

}
