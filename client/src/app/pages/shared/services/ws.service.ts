import {Injectable, OnInit} from "@angular/core";
import { Subject } from "rxjs";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: "root"
})

export class WsService implements OnInit{

  private listUsersCallback: Subject<string> = new Subject<string>();
  listUsersCallback$ = this.listUsersCallback.asObservable();

  ws: WebSocket | null = null

  constructor( private auth: AuthService) { }

  ngOnInit(): void {

  }

  wsStart() {
    if(this.ws)
      return

    this.ws = new WebSocket('ws://localhost:4444?token='+this.auth.getToken())

    this.ws.onopen =()=>{
      console.log("ws connected")
    }

    this.ws.onmessage = (event) => {
      try {
        const d = JSON.parse(event.data)
        if(d.type === 'listUsers'){
          this.listUsersCallback.next(d.data)
        }
        else if(d.type === 'newMessage'){

        }
        else if(d.type === 'newMessage'){

        }
        else if(d.type === 'newMessage'){

        }
      } catch (e) {
        console.log(e)
      }

    }


    this.ws.onclose =()=>{
      console.log("ws disconnected")
       if(this.auth.isAuthenticated()) this.wsStart()
    }
  }

  wsStop() {
    if(this.ws)
      this.ws.close()
  }

}
