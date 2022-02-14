export const Gender = {
  FEMALE: "Female",
  MALE: "Male",
  OTHER: "Other",
  UNKNOWN: "Unkown"
}

export function isValidGender(gender: string): boolean {
  return Object.keys(Gender).indexOf(gender) > -1 || 
          Object.values(Gender).indexOf(gender) > -1;
}