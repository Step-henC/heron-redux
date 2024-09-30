import { getGlycoDataExcel } from "../../ApiService/GlycoApiService/glycoApiService";


export const exportExcel = (tableData, successCallback, errorCallBack) => {
  getGlycoDataExcel(tableData, successCallback, errorCallBack)
}