import { Injectable } from '@angular/core';
import {ApplicationConfigService} from "../../config/application-config.service";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {getUserIdentifier, User} from "../models/user.model";
import {Pagination} from "../request/request.modal";
import {createRequestOption} from "../request/request-util";
import {isPresent} from "../../config/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('admin/users');

  constructor(private applicationConfigService: ApplicationConfigService, private httpClient: HttpClient) {}

  public users: User[] = [];

  public authorities(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.applicationConfigService.getEndpointFor('authorities'));
  }
  query(req?: Pagination): Observable<HttpResponse<User[]>> {
    const options = createRequestOption(req);
    return this.httpClient.get<User[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  public getUser(): Observable<any> {
    return this.httpClient.get(this.applicationConfigService.getEndpointFor('admin/users'));
  }

  public addUser(user: User): Observable<any>{
    return this.httpClient.post(this.applicationConfigService.getEndpointFor('admin/users'),user)
  }
  public delete(login: string): Observable<{}> {
    return this.httpClient.delete(`${this.resourceUrl}/${login}`);
  }

  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(this.applicationConfigService.getEndpointFor('admin/users'),user)
  }

  public search(query: string | undefined): Observable<any> {
    return this.httpClient.get(`${this.resourceUrl}/search?query=${query}`);
  }


  public importUser(file: FormData): Observable<any>{
    return this.httpClient.post(this.applicationConfigService.getEndpointFor('admin/import'),file)
  }

  find(login: string | undefined): Observable<User> {
    return this.httpClient.get<User>(`${this.resourceUrl}/${login}`);
  }

  addUserToCollectionIfMissing(userCollection: (User | null | undefined)[],
                               ...usersToCheck: (User | null | undefined)[]): (User | null | undefined)[] {
    const users: (User | null | undefined)[] = usersToCheck.filter(isPresent);
    if (users.length > 0) {
      const userCollectionIdentifiers = userCollection.map(userItem => getUserIdentifier(userItem)!);
      const usersToAdd = users.filter(userItem => {
        const userIdentifier = getUserIdentifier(userItem);
        if (userIdentifier == null || userCollectionIdentifiers.includes(userIdentifier)) {
          return false;
        }
        userCollectionIdentifiers.push(userIdentifier);
        return true;
      });
      return [...usersToAdd, ...userCollection];
    }
    return userCollection;
  }
}
