import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NiceSelectModule } from 'ng-nice-select';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

import {ToastrModule} from "ngx-toastr";
import {NgApexchartsModule} from "ng-apexcharts";


@NgModule({
  declarations: [
    HomeComponent,
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgbModule,
        SlickCarouselModule,
        NiceSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule,
    ],

  exports: [
  ]
})
export class HomeModule { }
