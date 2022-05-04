import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less']
})
export class AuthPageComponent {

  isLoginMode:boolean = true

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

}
