import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

import {getJobIdentifier, IJob} from "../models/job.model";
import {ITask} from "../models/task.model";
import {Result} from "../models/result.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {createRequestOption} from "../request/request-util";
import {IWorker} from "../models/worker.model";

const httpOptions={
  headers:new HttpHeaders(({'Content-Type': 'application/json'}))
}
export type EntityResponseType = HttpResponse<IJob>;
export type EntityArrayResponseType = HttpResponse<IJob[]>;
@Injectable({
  providedIn: 'root'
})

export class JobService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('jobs');
  constructor(private http:HttpClient,protected applicationConfigService: ApplicationConfigService) { }
  create(job: IJob): Observable<EntityResponseType> {
    return this.http.post<IJob>(this.resourceUrl, job, { observe: 'response' });
  }

  update(job: IJob): Observable<EntityResponseType> {
    return this.http.put<IJob>(`${this.resourceUrl}/${getJobIdentifier(job) as number}`, job, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJob>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number | undefined): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOptimizedSchedule(tasks: ITask[] | null, id: number | undefined):Observable<Result> {
    return this.http.get<Result>(`${this.resourceUrl}/job_shop/${id}`)
  }
  findJobsByUserId(id: number | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(`${this.resourceUrl}/users/${id}`, { params: options, observe: 'response' });
  }
}
