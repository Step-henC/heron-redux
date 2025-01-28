import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import ExportButton
from '../ExportButton/ExportButton';
import './hivdata.css'
import { getHivDataExcel } from '../../ApiService/HIVApiService/hivApiService';


const HivDatatable = ({
  tableData,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isExportError, setIsExportError] = useState(false)

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  //since we do not know all the col names beforehand
  // but first row is an array of col names
  // we filter first row of names, in table data below
  const columns = tableData[0].map((col, idx) => {

    return {

      name: col,
      selector: (row) => row[idx],
      wrap: true,
      reorder: true,
    }
  
  })

  const exportExcel = (data, onSucces, onError) => {
    getHivDataExcel(data, onSucces, onError)
  }

  return (
    <>
    {isButtonDisabled && <LoadingSpinner />}
    {isExportError && <div className='hiv-export-err'>Something went wrong with your export request. Please try again later or <a href='/contact'> contact us  here.</a></div>}
      <div className={'group-buttons-div'}>
        <ExportButton
          buttonText={'Export Excel'}
          onExport={() => {exportExcel(tableData, ()=> {setIsButtonDisabled(false); setIsExportError(false)}, () => {setIsButtonDisabled(false);setIsExportError(true)}); setIsButtonDisabled(true) }}
          disabled={isButtonDisabled}
        />
      </div>
      <DataTable
        key={'hivdata'}
        title="Table 1. Raw Data"
        pagination
        bordered
        striped
        columns={columns}
        data={tableData.filter((_, idx) => idx != 0)}
        paginationComponentOptions={paginationComponentOptions}
        progressPending={!tableData}
      />
    </>
  );
}

export default HivDatatable;
