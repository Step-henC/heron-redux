export const ACCEPTABLE_FILE_FORMATS = [
  "text/csv",
  // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // "application/vnd.ms-excel",
];

export const BAD_RUNS_PLACEHOLDER =
  "Please copy and paste the exact Replicate values as they are listed in the .csv file provided. Replicate values in the same group must be separated by a comma and enclosed in parenthesis. If it is a single sample without the designated number of technical replicates, place in parenthesis alone.";

export const EXPECTED_FIELD_NAMES = [
  "Replicate",
  "Peptide",
  "Peptide Peak Found Ratio",
  "Peptide Retention Time",
  "Protein",
  "Quantification",
  "Ratio To Standard",
];

export const BAD_LIST_PATTERN =
  /^(?:[(][a-zA-Z0-9_-]+((,\s)?[a-zA-Z0-9_-])*[)]\s?)+$/g;

  export const EMAIL_PATTERN = /^\S+[@]\S+[.](com|edu|net|org)$/g;