import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlycoDataTable from "../../components/GlycoDataTable/GlycoDataTable";


export default function GlycoChartsPage() {


  const [isTableProgressPending, setIsTableProgressPending] = useState(true);
  let navigate = useNavigate();
  const glycoFormData = useSelector((state) => state.glycoform)

  useEffect(() => {

    if(glycoFormData.isFormFilled === false){
      // since glyco data does not persist, this will re-navigate every refresh. 
      // its fine because this export is with an api call
      navigate('/glyco');
    } else {
      setIsTableProgressPending(false)
    }

  }, [glycoFormData])





  return (
    <>
   {isTableProgressPending && <LoadingSpinner /> }
    <GlycoDataTable tableData={glycoFormData.fileData} progressPending={isTableProgressPending}/>
    </>
  )
}