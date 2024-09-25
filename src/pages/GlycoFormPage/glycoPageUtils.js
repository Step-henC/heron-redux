import { isArray, isEmpty, isEqual } from "lodash"
import { EXPECTED_GLYCO_FIELDS } from "../../utils/acceptablefileformat";
export const validateGlycoFile = (file, successCallback, errorCallBack) => {

  if (file === undefined){
    errorCallBack()
    return;
  }
if (isEmpty(file)) {
  errorCallBack()
  return;
}

if (!isArray(file)) {
  errorCallBack()
  return;
}


// TODO place this filter and parseInt function below in one loop
const objectsWithBadKeys = file.filter((rowObject) =>  !isEqual(Object.keys(rowObject), EXPECTED_GLYCO_FIELDS))


if (objectsWithBadKeys.length > 0){
  errorCallBack();
  return;
}

successCallback(parseFileDataInts(file));

}

/**
 * Converts Total Area string to int.
 * @param file Skyline file with glyco data.
 * @returns Same file with Total Area as ints or NaN
 * NaN will be handled in backend
 */

export const parseFileDataInts = (file) => {

  return file.map((datum) => {
    const val = datum['Total Area']
    const numVal = parseInt(val)

    const returnVal = {...datum};
    returnVal['Total Area'] = isNaN(numVal) ? 'NaN' : numVal;

    return returnVal;
  })
}