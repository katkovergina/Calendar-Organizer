import { AuthService } from './shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { DateService } from './shared/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.autoLogin()
  }
  
}
