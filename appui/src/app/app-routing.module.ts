import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path : "",redirectTo : '/home',pathMatch : 'full'},
  {path : "home",component:HomeComponent,pathMatch : 'full',data : {'home': 'home component'}},
  {path:"signup", component:SignupComponent,pathMatch : 'full'},
  {path:"signin",component:SigninComponent,pathMatch : 'full'},
  {path: "dashboard",pathMatch : 'full', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
