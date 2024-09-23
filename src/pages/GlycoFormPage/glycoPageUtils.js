import { isArray, isEmpty } from "lodash"
import { EXPECTED_GLYCO_FIELDS } from "../../utils/acceptablefileformat";
export const validateGlycoFile = (file, successCallback, errorCallBack) => {

if (isEmpty(file)) {
  errorCallBack()
  return;
}

if (!isArray(file)) {
  errorCallBack()
  return;
}


const objectsWithBadKeys = file.filter((rowObject) => Object.keys(rowObject).some((k) => !EXPECTED_GLYCO_FIELDS.includes(k)))

if (objectsWithBadKeys.length > 0){
  errorCallBack();
  return;
}

successCallback();

}