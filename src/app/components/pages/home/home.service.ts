import { Directive, ElementRef, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApplicationConfigService} from "../../../config/application-config.service";

@Injectable({
  providedIn: 'root'
})
@Directive()
export class HomeService implements OnInit {

  constructor(private applicationConfigService: ApplicationConfigService, private router: ActivatedRoute, private route: Router, private httpClient: HttpClient) { }

  public getComponents(): Observable<any> {
    return this.httpClient.get(this.applicationConfigService.getEndpointFor(`cms-components`));
  }

  public getLocations(componentId: string | undefined): Observable<any> {
    return this.httpClient.get(this.applicationConfigService.getEndpointFor(`cms-components/${componentId}/stays`));
  }

  public getCompanies(componentId: string | undefined): Observable<any> {
    return this.httpClient.get(this.applicationConfigService.getEndpointFor(`cms-components/${componentId}/companies`));
  }

  public getNewLocations(componentId: string | undefined): Observable<any> {
    return this.httpClient.get(this.applicationConfigService.getEndpointFor(`stays/new`));
  }
  ngOnInit(): void {}
}
