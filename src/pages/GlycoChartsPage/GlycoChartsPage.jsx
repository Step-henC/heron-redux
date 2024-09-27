import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlycoDataTable from "../../components/GlycoDataTable/GlycoDataTable";
import { parseFileDataInts } from "../../mappers/glyco-mapper";


export default function GlycoChartsPage() {


  const [isTableProgressPending, setIsTableProgressPending] = useState(true);
  const [tableData, setTableData] = useState([])
  let navigate = useNavigate();
  const glycoFormData = useSelector((state) => state.glycoform)

  const settingTableData = (file) => {
    // no need fo start transition since computation is light load
    setTableData(parseFileDataInts(file))
  }

  useEffect(() => {

    if(glycoFormData?.isFormFilled === false){
      // since glyco data does not persist, this will re-navigate every refresh. 
      // its fine because this export is with an api call
      navigate('/glyco');
      return;
    } else {
      settingTableData(glycoFormData?.fileData)
      setIsTableProgressPending(false)
    }

  }, [glycoFormData])

  return (
    <>
   {isTableProgressPending && <LoadingSpinner /> }
    <GlycoDataTable tableData={tableData} progressPending={isTableProgressPending}/>
    </>
  )
}