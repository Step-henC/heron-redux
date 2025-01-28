import { useSelector } from "react-redux";
import HivDatatable from "../../../components/HIVDatatable/HivDatatable";

export default function HIVChartsPage() {

  const hivFormData = useSelector((state) => state.hivForm)

  return (
    <>
    <div style={{marginTop: '10px', display: 'flex', justifyContent: "center", width: "100%"}}><h2>HIV Chart</h2></div>
    {hivFormData.fileData && <HivDatatable tableData={hivFormData.fileData}/>}
    {!hivFormData.fileData && <div>Something went wrong. Please return <a href="/">home</a></div>}
    </>
  )
}