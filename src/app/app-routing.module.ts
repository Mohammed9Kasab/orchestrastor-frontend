import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoggedinGuard} from "./core/guards/loggedin.guard";
import {LocationUserGuard} from "./core/guards/location-user.guard";

const routes: Routes = [
  // Homepage
  { path: '', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule), data: { breadcrumb: "Homepage" } },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), data: { breadcrumb: "Authentication" }, canActivate: [LoggedinGuard] },
  //Profile
  { path: 'profile', loadChildren: () => import('./components/pages/profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: "Profile" } },

  // Additional
  { path: 'error-page', loadChildren: () => import('./components/pages/error-page/error-page.module').then(m => m.ErrorPageModule), data: { breadcrumb: "Error 404" } },
  { path: '**', loadChildren: () => import('./components/pages/error-page/error-page.module').then(m => m.ErrorPageModule), data: { breadcrumb: "Error 404" } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
