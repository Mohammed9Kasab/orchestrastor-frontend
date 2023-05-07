import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {LoggedinGuard} from "../core/guards/loggedin.guard";
import {RegisterComponent} from "./register/register.component";
import {PasswordResetInitComponent} from "./password-reset/init/password-reset-init.component";
import {PasswordResetFinishComponent} from "./password-reset/finish/password-reset-finish.component";
import {ActivationComponent} from "./activation/activation.component";
import {AuthGuard} from "../core/guards/auth.guard";



const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [LoggedinGuard],
  },
  {
    path: 'request-reset-password',
    component: PasswordResetInitComponent,
    canActivate: [LoggedinGuard],
  },
  {
    path: 'reset-password',
    component: PasswordResetFinishComponent,
    canActivate: [LoggedinGuard],
  },
  {
    path: 'activate',
    component: ActivationComponent,
    canActivate: [LoggedinGuard],
  },
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
