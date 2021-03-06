import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {WsService} from "../../services/ws.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  constructor(private auth:AuthService,
              private router:Router,
              private wsService: WsService) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['/login'])
    this.wsService.wsStop()
  }


}
