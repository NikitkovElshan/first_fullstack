import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  constructor
    (private auth: AuthService,
     private router: Router,
     private api: ApiService) {}


  ngOnInit(): void {

    this.api.getProducts().subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })

  }



}
