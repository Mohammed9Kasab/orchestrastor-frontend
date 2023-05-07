import {User} from "./user.model";
import {Account} from "../../authentication/account.model";

export interface IJob {
  id?:number;
  name?:string;
  user?:Account | null
}
export class Job implements IJob {
  constructor(public id?: number, public name?: string, public user?:Account | null) {}
}
export function getJobIdentifier(job: IJob): number | undefined {
  return job.id;
}


