import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { RegisterModalComponent } from './register/register-modal/register-modal.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import {SharedModule} from "../components/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignInModalComponent } from './sign-in/sign-in-modal/sign-in-modal.component';
import {AccountService} from "./service/account.service";
import {StateStorageService} from "./service/state-storage.service";
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetInitModalComponent } from './password-reset/init/password-reset-init-modal/password-reset-init-modal.component';
import { PasswordResetFinishModalComponent } from './password-reset/finish/password-reset-finish-modal/password-reset-finish-modal.component';
import { ActivationComponent } from './activation/activation.component';
import { ActivationModalComponent } from './activation/activation-modal/activation-modal.component';



@NgModule({
  declarations: [
    RegisterComponent,
    RegisterModalComponent,
    SignInComponent,
    SignInModalComponent,
    PasswordResetFinishComponent,
    PasswordResetInitComponent,
    PasswordResetInitModalComponent,
    PasswordResetFinishModalComponent,
    ActivationComponent,
    ActivationModalComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers:[AccountService,SignInModalComponent,StateStorageService]
})
export class AuthenticationModule {

}
