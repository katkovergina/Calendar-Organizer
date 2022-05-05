import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less']
})
export class AuthPageComponent {

  isLoginMode:boolean = true

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password

    if (this.isLoginMode) {
      ///
    } else {
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData)
      }, error => {
        console.log(error)
      })
    }
    form.reset()
  }

}
