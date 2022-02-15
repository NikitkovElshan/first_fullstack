import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";


import {AppComponent} from './app.component';
import {AuthLayoutComponent} from './pages/shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from "./pages/shared/layouts/site-layout/site-layout.component";
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {TokenInterceptor} from "./pages/shared/classes/token.interceptor";
import {ProductsPageComponent} from './pages/products-page/products-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    MainPageComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    ProductsPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
