export const Race = {
  AMERICAN_INDIAN_OR_ALASKA_NATIVE: "American Indian or Alaska Native",
  ASIAN: "Asian",
  BLACK_OR_AFRICAN_AMERICAN: "Black or African American",
  HISPANIC_OR_LATINO: "Hispanic or Latino",
  NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER: "Native Hawaiian or Other Pacific Islander",
  WHITE: "White",
  MULTI_RACIAL: "Multi-racial"
}

export function isValidRace(race: string): boolean {
  return Object.keys(Race).indexOf(race) > - 1 ||
          Object.values(Race).indexOf(race) > -1;
}