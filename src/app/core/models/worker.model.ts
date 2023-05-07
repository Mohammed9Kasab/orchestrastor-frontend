export interface IWorker {
  id?:number;
  name?:string;
}
export class Worker implements IWorker {
  constructor(public id?: number, public name?: string) {}
}
export function getWorkerIdentifier(worker: IWorker): number | undefined {
  return worker.id;
}


