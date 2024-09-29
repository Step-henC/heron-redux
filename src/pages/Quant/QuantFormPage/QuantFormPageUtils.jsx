import { isArray, isEqual } from "lodash";
import { EXPECTED_FIELD_NAMES } from "../../../utils/acceptablefileformat";
export const validateQuantFile = (fileDataJsonArray, successCallBack, errorCallback) => {
 
  if (!isArray(fileDataJsonArray)  || !fileDataJsonArray ){
   errorCallback()
    return;

  }

  if (fileDataJsonArray?.length === 0){
    errorCallback()
    return;
  }

    // all should have same row titles
  // we will break at first one
  const sortedExpectedFields = EXPECTED_FIELD_NAMES.sort();

  for (const row of fileDataJsonArray) {

    const sortedRowTitles = Object.keys(row).sort();

    if (isEqual(sortedRowTitles, sortedExpectedFields) === false) {
      errorCallback();
      return;
    }
  }


 successCallBack(fileDataJsonArray)

}


export const convertBadSamplesToOutlierList = (userInputBadSamples) => {
  if ( typeof userInputBadSamples !== "string" || userInputBadSamples === null){
    return [[]];
  }
  const convertToNameList = userInputBadSamples.split(')').filter((str) => str !== '')
  .map((str) => {
    const newStr = str.replace(/[()]/g, "").trim();
    return newStr.split(', ')
  })

  return convertToNameList;
}