import { Gender, isValidGender } from './Gender';

describe('isValidGender', ()=> {
  Object.keys(Gender).forEach((genderKey)=> {
    it('should return true for valid genders: ' + genderKey, () => {
      expect(isValidGender(genderKey)).toBeTruthy();
    });
  });

  Object.values(Gender).forEach((genderValue)=> {
    it('should return true for valid genders: ' + genderValue, () => {
      expect(isValidGender(genderValue)).toBeTruthy();
    });
  });

  [
    '',
    'NotAGender',
  ].forEach((invalidGender) => {
    it('should return false for invalid gender: ' + invalidGender, () => {
      expect(isValidGender(invalidGender)).toBeFalsy();
    });
  });
  [
    'male',
    'female',
    'other',
    'unknown',
    'Unkown',
    'maLe',
    'feMale',
    'otHer',
    'unKnown',
  ].forEach((invalidGenderCase) => {
    it('should return false for valid genders with incorrect case: ' + invalidGenderCase, () => {
      expect(isValidGender(invalidGenderCase)).toBeFalsy();
    });
  });

  it('should return false for undefined parameter', () => {
    expect(isValidGender(undefined)).toBeFalsy();
  });

  it('should return false for null parameter', () => {
    expect(isValidGender(null)).toBeFalsy();
  });
})