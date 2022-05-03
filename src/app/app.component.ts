import { Component } from '@angular/core';
import { DateService } from './shared/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  darkMode = false
  btnIconSrc: string = '../assets/icons/moon.svg'

  constructor(public dateService: DateService) {}

  toNow() {
    this.dateService.toNow()
  }

  changeMode() {
    this.darkMode = !this.darkMode
    this.darkMode ? this.btnIconSrc = '../assets/icons/sun.svg' : this.btnIconSrc = '../assets/icons/moon.svg'
  }
}
