import {User} from "./user.model";
import {Account} from "../../authentication/account.model";

export interface IWorker {
  id?:number;
  name?:string;
  user?:Account | null
}
export class Worker implements IWorker {
  constructor(public id?: number, public name?: string, public user?:Account | null) {}
}
export function getWorkerIdentifier(worker: IWorker): number | undefined {
  return worker.id;
}


