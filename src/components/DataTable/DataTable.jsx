import {useState, useMemo, memo} from 'react';
import DataTable from "react-data-table-component";
import MultiColSelect from '../MultiColSelect/MultiColSelect';


const CustomDataTable = memo( function CustomDataTable({tableData, progressPending})  {
  const [selected, setSelected] = useState([]);
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const sortQuant = (a, b) => a?.ParsedQuantification - b?.ParsedQuantification;

  const sortRatioStandard = (a, b) =>
    a.ParsedRatioToStandard - b.ParsedRatioToStandard;

  const sortRetentionTime = (rowA, rowB) => {
    const a = parseFloat(rowA["Peptide Retention Time"]);
    const b = parseFloat(rowB["Peptide Retention Time"]);

    if (a > b) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
    return 0;
  };

  const sortPeakRatio = (rowA, rowB) => {
    const a = parseFloat(rowA["Peptide Peak Found Ratio"]);
    const b = parseFloat(rowB["Peptide Peak Found Ratio"]);

    if (a > b) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
    return 0;
  };

  const columns = [
    {
      name: "Peptide Name",
      selector: (row) => row?.Peptide,
      reorder: true,
      omit: selected.some((item) => item.label === "Peptide Name"),
    },
    {
      name: "Replicate Name",
      selector: (row) => row?.Replicate,
      wrap: true,
      reorder: true,
      omit: selected.some((item) => item.label === "Replicate"),
    },
    {
      name: "Peptide Peak Ratio",
      selector: (row) => row["Peptide Peak Found Ratio"],
      sortable: true,
      sortFunction: sortPeakRatio,
      reorder: true,
      width: "10em",
      omit: selected.some((item) => item.label === "Peptide Peak Ratio"),
    },
    {
      name: "Peptide Retention Time",
      selector: (row) => row["Peptide Retention Time"],
      sortable: true,
      sortFunction: sortRetentionTime,
      reorder: true,
      omit: selected.some((item) => item.label === "Peptide Retention Time"),
    },
    {
      name: "Protein",
      selector: (row) => row?.Protein,
      reorder: true,
      omit: selected.some((item) => item.label === "Protein"),
    },
    {
      name: "Quantification",
      selector: (row) => row?.Quantification,
      sortable: true,
      sortFunction: sortQuant,
      reorder: true,
      omit: selected.some((item) => item.label === "Quantification"),
    },
    {
      name: "Quantification Replicate Avg",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      reorder: true,
      omit: selected.some((item) => item.label === "Quant Group Avg"),
      style: {
        backgroundColor: "rgba(181, 192, 216, 1)",
      },
    },
    {
      name: "Ratio To Standard",
      selector: (row) => row["Ratio To Standard"],
      sortable: true,
      sortFunction: sortRatioStandard,
      reorder: true,
      omit: selected.some((item) => item.label === "Ratio To Standard"),
    },
    {
      name: "Peptide Result Ratio Avg",
      selector: (row) => row?.RatioAvg,
      omit: selected.some((item) => item.label === "Ratio Group Avg"),
      grow: 2,
      reorder: true,
      style: {
        backgroundColor: "rgba(181, 192, 216, 1)",
      },
    },
  ];

  const subHeaderMemo = useMemo(
    () => <MultiColSelect selectFunction={(e) => setSelected(e)} />,
    []
  );



  return (
    <DataTable 
    title="Table 1. Data Averages"
    subHeader
    subHeaderComponent={subHeaderMemo}
    key={"first-table-key-here"}
    pagination
    columns={columns}
    paginationComponentOptions={paginationComponentOptions}
    data={tableData}
    progressPending={progressPending}
    />

  )
})

export default CustomDataTable;