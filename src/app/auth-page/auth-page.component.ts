import { AuthResponseData } from './../shared/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less']
})
export class AuthPageComponent {

  isLoginMode: boolean = true
  isLoading: boolean = false
  error: string | null = null
  darkMode = false
  btnIconSrc: string = '../assets/icons/moon.svg'

  constructor(private authService: AuthService, private router: Router) {}

  changeMode() {
    this.darkMode = !this.darkMode
    this.darkMode ? this.btnIconSrc = '../assets/icons/sun.svg' : this.btnIconSrc = '../assets/icons/moon.svg'
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      resData => {
        console.log(resData)
        this.isLoading = false
        this.router.navigate(['/calendar'])
      },
      errorMessage => {
        console.log(errorMessage)
        this.error = errorMessage
        this.isLoading = false
      }
    )
    form.reset()
  }
}