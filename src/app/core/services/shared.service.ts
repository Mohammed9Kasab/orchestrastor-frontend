import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SharedService {

  reservationCheckIn: BehaviorSubject<string> = new BehaviorSubject('');

  reservationCheckOut: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
  }
}
