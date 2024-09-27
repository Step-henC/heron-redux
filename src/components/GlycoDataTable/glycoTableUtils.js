import { getGlycoDataExcel } from "../../ApiService/GlycoApiService/glycoApiService";


export const exportExcel = (tableData) => {
  getGlycoDataExcel(tableData)
}