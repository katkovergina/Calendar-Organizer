import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent {

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
