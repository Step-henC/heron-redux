import DataTable from 'react-data-table-component';
import React, { useState, memo } from 'react';
import ExportButton from '../ExportButton/ExportButton';
import { exportExcel } from './glycoTableUtils';
import GlycoDataTableSubheader from './GlycoDataTableSubheader';
import './glycodatatable.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const GlycoDataTable = memo(function GlycoDataTable({
  tableData,
  progressPending,
}) {
  const [selectedCol, setSelectedCol] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isExportError, setIsExportError] = useState(false)

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  const columns = [
    {
      name: 'Protein Name',
      selector: (row) => row['Protein Name'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Protein Name'),
    },
    {
      name: 'Replicate Name',
      selector: (row) => row['Replicate Name'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Replicate Name'),
    },
    {
      name: 'Peptide Sequence',
      selector: (row) => row['Peptide Sequence'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Peptide Sequence'),
    },
    {
      name: 'Precursor',
      selector: (row) => row.Precursor,
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Precursor'),
    },
    {
      name: 'Total Area',
      selector: (row) => row['Total Area'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Total Area'),
    },
    {
      name: 'Isotope Dist Rank',
      selector: (row) => row['Isotope Dist Rank'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Isotope Dist Rank'),
    },
    {
      name: 'Isotope Dist Index',
      selector: (row) => row['Isotope Dist Index'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Isotope Dist Index'),
    },
    {
      name: 'Isotope Dist Proportion',
      selector: (row) => row['Isotope Dist Proportion'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some(
        (item) => item.label === 'Isotope Dist Proportion'
      ),
    },
    {
      name: 'Best Retention Time',
      selector: (row) => row['Best Retention Time'],
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === 'Best Retention Time'),
    },
  ];

  return (
    <>
    {isExportError && <div className='glyco-export-err'>Something went wrong with your export request. Please try again later or <a href='/contact'> contact us  here.</a></div>}
    {isButtonDisabled && <LoadingSpinner />}
      <div className={'group-buttons-div'}>
        <GlycoDataTableSubheader selectFunction={(e) => setSelectedCol(e)} />
        <ExportButton
          buttonText={'Export Excel'}
          onExport={() => {exportExcel(tableData, ()=> setIsButtonDisabled(false), () => {setIsButtonDisabled(false);setIsExportError(true)}); setIsButtonDisabled(true) }}
          disabled={isButtonDisabled}
        />
      </div>
      <DataTable
        key={'raw-data'}
        title="Table 1. Raw Input Data"
        pagination
        bordered
        striped
        columns={columns}
        data={tableData}
        paginationComponentOptions={paginationComponentOptions}
        progressPending={progressPending}
      />
    </>
  );
});

export default GlycoDataTable;
