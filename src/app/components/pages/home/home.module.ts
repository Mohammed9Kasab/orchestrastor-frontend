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
import { JspChartComponent } from './models/jsp-chart/jsp-chart.component';
import { FcfsChartComponent } from './models/fcfs-chart/fcfs-chart.component';
import { MmrChartComponent } from './models/mmr-chart/mmr-chart.component';


@NgModule({
  declarations: [
    HomeComponent,
    JspChartComponent,
    FcfsChartComponent,
    MmrChartComponent
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
    JspChartComponent,
    FcfsChartComponent,
    MmrChartComponent
  ]
})
export class HomeModule { }
