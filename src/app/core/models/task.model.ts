import {IWorker} from "./worker.model";
import {IJob} from "./job.model";
import {User} from "./user.model";
import {Account} from "../../authentication/account.model";


export interface ITask {
  id?:number;
  worker?:IWorker | null;
  job?:IJob | null;
  duration?:number;
  user?:Account | null
}
export class Task implements ITask {
  constructor(public id?: number, public worker?: IWorker | null,public job?: IJob | null, public duration?: number, public user?:Account | null) {}
}
export function getTaskIdentifier(task: ITask): number | undefined {
  return task.id;
}


