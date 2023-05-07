import {isPresent} from "../../config/operators";

export class User {
  id?: number;
  login?: string;
  firstName?: string | null;
  cui?:String|null;
  lastName?: string | null;
  email?: string;
  phoneNumber?: string | null | undefined;
  imageUrl?: string;
  langKey?: string = "en";
}


export function getUserIdentifier(user: User | null | undefined): number | undefined {

  return isPresent(user) ? user.id : undefined
}
