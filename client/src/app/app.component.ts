import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./pages/shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    const candidateToken = localStorage.getItem('auth-token')
    if(candidateToken){
      this.auth.setToken(candidateToken)
    }
  }

  ngOnDestroy(): void {

  }

}
