import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from '../../config/application-config.service';
import {SignIn} from "../sign-in/sign-in-modal/sign-in.model";


type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = localStorage.getItem('authenticationToken');
    const tokenInSessionStorage: string | null = sessionStorage.getItem('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: SignIn): Observable<void> {
    return this.http
      .post<JwtToken>(this.applicationConfigService.getEndpointFor('authenticate'), credentials)
      .pipe(map(response => {
        this.authenticateSuccess(response, credentials.rememberMe)
      }));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      sessionStorage.removeItem('authenticationToken');
      observer.complete();
    });
  }

  saveToken(token: string) {
    sessionStorage.setItem('authenticationToken', token);
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if(rememberMe){
      localStorage.setItem('authenticationToken', jwt);
      sessionStorage.removeItem('authenticationToken');
    } else {
      localStorage.removeItem('authenticationToken');
      sessionStorage.setItem('authenticationToken', jwt);
    }
  }
}
