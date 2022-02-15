import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../shared/services/toast.servise";




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit ,OnDestroy {




    form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private router: Router,
              public auth: AuthService,
              private route: ActivatedRoute,
              private toast: ToastService
  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      if (params['registered']) {
        this.toast.show('Вы успешно зарегистрировались!','white','green',4000)
      } else if (params['accessDenied']) {
        this.toast.show('Вы  не авторизованны!','white','red',4000)
        this.auth.logout()
      } else if (params['sessionFailed']) {
        this.toast.show('Session closed, please login again', 'white', 'orange', 4000)
        this.auth.logout()
      }
    })
  }

  onSubmit() {
  this.form.disable()
    this.auth.login(this.form.value).subscribe(res => {
      this.router.navigate(['/main'],{
        queryParams: {
          login: true
        }
      })
    }, error => {
        console.log(error)
          this.form.enable()
    })
  }

 ngOnDestroy(): void {

}

}
