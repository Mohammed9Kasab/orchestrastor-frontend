import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApplicationConfigService} from "../../config/application-config.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  get(key: string): Observable<{}> {
    return this.http.get(this.applicationConfigService.getEndpointFor('activate'), {
      params: new HttpParams().set('key', key),
    });
  }
}
