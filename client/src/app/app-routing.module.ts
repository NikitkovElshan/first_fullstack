import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {AuthLayoutComponent} from "./pages/shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./pages/shared/layouts/site-layout/site-layout.component";
import {AuthGuard} from "./pages/shared/classes/auth.guard";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {ProductsPageComponent} from "./pages/products-page/products-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";



const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'main', component: MainPageComponent},
      {path: 'products',component: ProductsPageComponent},
      {path:'home', component: HomePageComponent}
    ]
  },
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
