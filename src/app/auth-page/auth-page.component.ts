import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  inSubmit(form: NgForm) {
    
  }

}
