import { FormControl, ValidationErrors } from "@angular/forms";
import { validateGender } from "./GenderValidators";

describe('validateGender', () => {
  it('should return validation errors if gender is invalid', () => {

    const genderFormControl = new FormControl();
    genderFormControl.setValue('NotAGender');

    const expectedValidationError: ValidationErrors = {
      validateGender: {
        valid: false
      }
    }
    expect(validateGender(genderFormControl)).toEqual(expectedValidationError);
  });

  it('should return null if gender is valid', () => {

    const genderFormControl = new FormControl();
    genderFormControl.setValue('FEMALE');

    const expectedValidationError: ValidationErrors = {
      validateGender: {
        valid: false
      }
    }
    expect(validateGender(genderFormControl)).toBeNull();
  });

});