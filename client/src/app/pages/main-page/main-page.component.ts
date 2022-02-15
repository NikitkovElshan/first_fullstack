import { Component, OnInit } from '@angular/core';
import {ToastService} from "../shared/services/toast.servise";
import {AuthService} from "../shared/services/auth.service";
import {WsService} from "../shared/services/ws.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../shared/services/api.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  mySet: Set<string> = new Set<string>()

  constructor(public  toast: ToastService,
              private auth: AuthService,
              private router: Router,
              public wss: WsService,
              private route: ActivatedRoute,
              private api:ApiService) { }

  ngOnInit(): void {

    this.api.getMain().subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })


    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      if (params['login']) {
        this.toast.show('Вы успешно авторизовальсь!','white','green',3000)
        this.router.navigate(['/main']);
      }
    })

    this.wss.wsStart()

    this.wss.listUsersCallback$.subscribe(data => {
      this.mySet.clear()
      for(const item of data){
        this.mySet.add(item)
      }
    })
  }



}


