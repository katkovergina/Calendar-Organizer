import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less']
})
export class AuthPageComponent {

  isLoginMode: boolean = true
  isLoading: boolean = false
  error: string | null = null

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


    this.isLoading = true
    if (this.isLoginMode) {
      ///
    } else {
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData)
        this.isLoading = false
      }, error => {
        console.log(error)
        this.error = 'An error occured!'
        this.isLoading = false
      })
    }
    form.reset()
  }

}
