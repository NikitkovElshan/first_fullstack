import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../shared/services/toast.servise";


@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {



    form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(7), Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password2: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })


  constructor(private router: Router,
              private auth: AuthService,
              private toast: ToastService) {}

  submit(){
  this.form.disable()
   delete this.form.value.password2
    this.auth.register(this.form.value).subscribe(resolve => {
      this.router.navigate(['/login'],{
        queryParams: {
          registered: true
        }
      })
    }, e => {
        this.toast.show(e.error.message,'white','red',2000)
        this.form.enable()
    })
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }


}
