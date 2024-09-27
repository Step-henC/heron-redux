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

if (file.length === 0 ){
  errorCallBack()
  return;
}


// TODO place this filter and parseInt function below in one loop
const objectsWithBadKeys = file.filter((rowObject) =>  !isEqual(Object.keys(rowObject), EXPECTED_GLYCO_FIELDS))


if (objectsWithBadKeys.length > 0){
  errorCallBack();
  return;
}

successCallback(file);

}
