import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApplicationConfigService} from "../../config/application-config.service";
import {Account} from "../account.model";

@Injectable({ providedIn: 'root' })
export class PasswordResetFinishService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(key: string, newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('account/reset-password/finish'), { key, newPassword });
  }

  saveNewPassword(login: string | undefined, newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor(`account/reset-password/${login}/${newPassword}`),{ login, newPassword })
  }

  RestPassword(currentPassword: string , newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor(`account/change-password`),{ currentPassword, newPassword })
  }

}
