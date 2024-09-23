import { isArray } from "lodash";
import { EXPECTED_FIELD_NAMES } from "../../utils/acceptablefileformat";
export const validateQuantFile = (fileDataJsonArray, successCallBack, errorCallback) => {
 
  if (!isArray(fileDataJsonArray)  || !fileDataJsonArray ){
   errorCallback()
    return;

  }

  if (fileDataJsonArray?.length === 0){
    errorCallback()
    return;
  }

  const objectsWithBadKeys = fileDataJsonArray.filter((rowObject) => Object.keys(rowObject).some((k) => !EXPECTED_FIELD_NAMES.includes(k)))

   if(objectsWithBadKeys.length > 0){
    errorCallback()
    return;
   }

 successCallBack()

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