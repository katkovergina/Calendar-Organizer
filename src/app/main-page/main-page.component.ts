import { AuthService } from './../shared/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false
  private userSub!: Subscription

  darkMode = false

  constructor(
    public dateService: DateService, 
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.AuthService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true
    })
  }

  toNow() {
    this.dateService.toNow()
  }

  changeMode() {
    this.darkMode = !this.darkMode
  }

  onLogout() {
    this.AuthService.logout()
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}