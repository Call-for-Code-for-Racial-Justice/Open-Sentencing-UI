import { FormControl, ValidationErrors } from "@angular/forms";
import { isValidRace } from "src/app/models/client/Race";

export function validateRace(formControl: FormControl): ValidationErrors | null {
  return isValidRace(formControl.value)? null: {
    validateRace: {
      valid: false
    }
  };
}