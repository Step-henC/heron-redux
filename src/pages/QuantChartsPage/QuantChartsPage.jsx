import CustomDataTable from '../../components/DataTable/DataTable';
import { useSelector } from 'react-redux';
import { quantMapper } from '../../mappers/quant-mapper';
import AveragesTable from '../../components/AveragesTable/AveragesTable';
import LineCharts from '../../components/LineCharts/LineCharts';
import { uniqueId, isEmpty } from 'lodash';
import { loadWorker } from './worker/worker-helper';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import starterWorker from './worker/worker';

import { useRef, useState, useEffect, useTransition } from 'react';
import './quantchartspage.css';
import { useNavigate } from 'react-router-dom';

export default function QuantChartsPage() {
  const [pdfLoading, setPdfLoading] = useState(false);
  // const [tableData, setTableData] = useState([]);
  const [uniquePeptides, setUniquePeptides] = useState([]);
  const [worker, setWorker] = useState(null);
  const [tableData, setTableData] = useState([])
  // two useTransitions are "batched" by React for now
  // but may not be batched in future releases
  // best practices suggesting placing transitions in individual components
  // but I want chart components to simply render something and not handle too much state logic
  const [isTableDataPending, startTableDataTransition] = useTransition();

  const quantFormData = useSelector((state) => state.quantform);

  const settingTableData = (fileData, replicateNumber, outlierList) => {
    startTableDataTransition(() => {
      setTableData(quantMapper(
        fileData, replicateNumber, outlierList
      ))
    })
  }
  let navigate = useNavigate();

  const targetRef = useRef(null);

  useEffect(() => {
    if (!quantFormData || quantFormData?.isFormFilled === false) {
      navigate('/quant');
      return;
    }
  }, [quantFormData]);

  useEffect(() => {

    if (isEmpty(quantFormData) === false) {
      settingTableData(quantFormData.fileData, quantFormData.replicateNumber, quantFormData.outlierInput)
    }
  }, [quantFormData])

  useEffect(() => {
    const tempWorker = loadWorker(starterWorker);

    tempWorker.onmessage = function (event) {
      if (event?.data?.message === 'ok' && event.data?.payload !== null) {
        setUniquePeptides(event.data.payload);
      }
    };

    setWorker(tempWorker);

    return () => {
      tempWorker.terminate();
    };
  }, []);

  useEffect(() => {
    // sent to web worker despite useTransition
    // preventing UI freeze
    // because if someone searches filter while unique list pending
    // react will prioritize the text search filter state update
    if (worker && quantFormData) {
      worker.postMessage({
        source: 'heron-quant-chart',
        payload: quantFormData.fileData,
      });
    }
  }, [worker, quantFormData]);


  const toPDF = () => {

    // largest bundle dynamic import rspack better load times
    // ideally move to backend logic but fine here now
    import('react-to-pdf').then((generatePDF) => {
      setPdfLoading(true);
      generatePDF(targetRef, {}).then(() => setPdfLoading(false));

    })
  
  };

  return (

    <>
    {isTableDataPending && <LoadingSpinner />}
      <div className={'data-table-div'}>
        <CustomDataTable
          tableData={tableData}
        />
      </div>

      <div className={'data-table-div'}>
        <AveragesTable
          groupData={tableData.filter((row) => row.RatioAvg !== undefined)}
        />
        </div>
    

      <div className="line-chart-div" ref={targetRef}>
        {!isEmpty(uniquePeptides) ? (
          uniquePeptides.map((peptideName) => (
            <LineCharts
              key={uniqueId()}
              showData={true}
              peptideName={peptideName}
              dataForLineGraph={tableData.filter(
                (row) =>
                  row.RatioAvg !== undefined && row.Peptide === peptideName
              )}
              showErrorX={true}
              showErrorY={true}
            />
          ))
        ) : (
          <div className={'loading-text'}>
            Loading
          </div>
        )}
      </div>
    </>
  );
}
