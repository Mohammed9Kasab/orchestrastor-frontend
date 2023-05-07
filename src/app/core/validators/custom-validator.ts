import {AbstractControl, ValidatorFn} from "@angular/forms";

export class CustomValidator {

  constructor() {
  }

  static startTimeEndTime(startTimeField: string, endTimeField: string): ValidatorFn {
    return (formGroup: AbstractControl): {[key: string]: boolean} | null => {
      // @ts-ignore
      const startTime = formGroup.get(startTimeField).value;
      // @ts-ignore
      const endTime = formGroup.get(endTimeField).value;
      if ((startTime !== null && endTime !== null) && startTime > endTime) {
        return {noValid: true};
      }

      // if()

      return null;
    }
  }
}
