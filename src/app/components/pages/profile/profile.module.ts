import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {ProfileComponent} from "./profile.component";
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgbNavModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule {

}
