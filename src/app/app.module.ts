import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbModule} from 'angular-crumbs';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {httpInterceptorProviders} from "./core/interceptors";
import {NgxStarRatingModule} from 'ngx-star-rating';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {GoogleMapsModule} from "@angular/google-maps";
import {NgxSpinnerModule} from "ngx-spinner";
import {SharedService} from "./core/services/shared.service";
import {SharedModule} from "./components/shared/shared.module";
import {ToastrModule} from "ngx-toastr";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CookieService} from "ngx-cookie-service";
import {NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule} from "ngx-google-analytics";


const materialModules = [
  MatDatepickerModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMomentDateModule,
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    NgbModule,
    HttpClientModule,
    AuthenticationModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxYoutubePlayerModule.forRoot(),
    GoogleMapsModule,
    NgxSpinnerModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxGoogleAnalyticsModule.forRoot('G-R715C95YDG'),
    NgxGoogleAnalyticsRouterModule,
    materialModules

  ],
  providers: [
    SessionStorageService,
    LocalStorageService,
    httpInterceptorProviders,
    SharedService,
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    materialModules
  ]
})
export class AppModule {
}
