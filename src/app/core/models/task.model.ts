import {IWorker} from "./worker.model";
import {IJob} from "./job.model";


export interface ITask {
  id?:number;
  worker?:IWorker | null;
  job?:IJob | null;
  duration?:number;
}
export class Task implements ITask {
  constructor(public id?: number, public worker?: IWorker | null,public job?: IJob | null, public duration?: number) {}
}
export function getTaskIdentifier(task: ITask): number | undefined {
  return task.id;
}


