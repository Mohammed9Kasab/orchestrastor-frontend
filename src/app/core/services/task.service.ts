import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {getTaskIdentifier, ITask} from "../models/task.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {createRequestOption} from "../request/request-util";


const httpOptions={
  headers:new HttpHeaders(({'Content-Type': 'application/json'}))
}
export type EntityResponseType = HttpResponse<ITask>;
export type EntityArrayResponseType = HttpResponse<ITask[]>;
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('tasks');
  constructor(private http:HttpClient,protected applicationConfigService: ApplicationConfigService) { }
  create(task: ITask): Observable<EntityResponseType> {
    return this.http.post<ITask>(this.resourceUrl, task, { observe: 'response' });
  }

  update(task: ITask) {
    return this.http.put<ITask>(`${this.resourceUrl}/${getTaskIdentifier(task) as number}`, task, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITask>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITask[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number | undefined): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  getByJobId(jobId: number | undefined): Observable<EntityArrayResponseType> {
    return this.http.get<ITask[]>(`${this.resourceUrl}/job/${jobId}`, {  observe: 'response' });
  }
}
