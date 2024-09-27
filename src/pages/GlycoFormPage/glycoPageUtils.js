import { isArray, isEmpty, isEqual } from "lodash"
import { EXPECTED_GLYCO_FIELDS } from "../../utils/acceptablefileformat";
export const validateGlycoFile = (file, successCallback, errorCallBack) => {

if (isEmpty(file) || !file) {
  errorCallBack()
  return;
}

if (!isArray(file)) {
  errorCallBack()
  return;
}

const objectsWithBadKeys = file.filter((rowObject) =>  !isEqual(Object.keys(rowObject), EXPECTED_GLYCO_FIELDS))


if (objectsWithBadKeys.length > 0){
  errorCallBack();
  return;
}

successCallback(file);

}
