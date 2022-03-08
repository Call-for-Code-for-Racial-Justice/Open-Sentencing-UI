import { Race, isValidRace } from "./Race";

describe('isValidRace', () => {
  Object.keys(Race).forEach((raceKey) => {
    it('should return true for valid races: ' + raceKey, () => {
      expect(isValidRace(raceKey)).toBeTruthy();
    });
  });

  Object.values(Race).forEach((raceValue)  => {
    it('should return true for valid races: ' + raceValue, () => {
      expect(isValidRace(raceValue)).toBeTruthy();
    });
  });

  const notValidRaces = [
    '',
    'NotARace',
  ];

  notValidRaces.forEach((invalidRace) => {
    it('should return false for invalid race: ' + invalidRace, () => {
      expect(isValidRace(invalidRace)).toBeFalsy();
    });
  });

  const racesWithInvalidCase = [
    'american_indian_or_alaska_native',
    'asian',
    'black_or_african_american',
    'hispanic_or_latino',
    'native_hawaiian_or_other_pacific_islander',
    'white',
    'multi_racial',
    'American_Indian_Or_Alaska_Native',
    'asiAn',
    'Black_Or_African_American',
    'Hispanic_Or_Latino',
    'Native_Hawaiian_Or_Other_Pacific_Islander',
    'wHite',
    'Multi_Racial',
  ];

  racesWithInvalidCase.forEach((raceWithInvalidCase) => {
    it('should return false for invalid race: ' + raceWithInvalidCase, () => {
      expect(isValidRace(raceWithInvalidCase)).toBeFalsy();
    });
  });

  const racesWithInvalidUnderscores = [
    'american_indian_alaka_native',
    'asian_',
    'black_african_american',
    'hispanic_latino',
    'native_hawaiian_other_pacific_islander',
    'white_',
    'multiracial'
  ];

  racesWithInvalidUnderscores.forEach((raceWithInvalidUnderscore) => {
    it('should return false for invalid race: ' + raceWithInvalidUnderscore, () => {
      expect(isValidRace(raceWithInvalidUnderscore)).toBeFalsy();
    });
  });

  it('should return false for undefined parameter', () => {
    expect(isValidRace(undefined)).toBeFalsy();
  });

  it('should return false for null parameter', () => {
    expect(isValidRace(null)).toBeFalsy();
  });

});