import { FormControl, ValidationErrors } from "@angular/forms";
import { isValidGender } from "src/app/models/client/Gender";

export function validateGender(formControl: FormControl): ValidationErrors | null {
  return isValidGender(formControl.value)? null: {
    validateGender: {
      valid: false
    }
  };
}