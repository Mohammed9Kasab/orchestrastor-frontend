import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

import {getWorkerIdentifier, IWorker} from "../models/worker.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {createRequestOption} from "../request/request-util";

const httpOptions={
  headers:new HttpHeaders(({'Content-Type': 'application/json'}))
}
export type EntityResponseType = HttpResponse<IWorker>;
export type EntityArrayResponseType = HttpResponse<IWorker[]>;
@Injectable({
  providedIn: 'root'
})

export class WorkerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('workers');
  constructor(private http:HttpClient,protected applicationConfigService: ApplicationConfigService) { }
  create(worker: IWorker): Observable<EntityResponseType> {
    console.log("worker")
    console.log(worker)
    return this.http.post<IWorker>(this.resourceUrl, worker, { observe: 'response' });
  }

  update(worker: IWorker): Observable<EntityResponseType> {
    return this.http.put<IWorker>(`${this.resourceUrl}/${getWorkerIdentifier(worker) as number}`, worker, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorker>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorker[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number | undefined): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
