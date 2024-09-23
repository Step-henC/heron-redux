import Select from "react-select";
import React from "react";
export default function MultiColSelect({ selectFunction, selectionValue }) {
  const options = [
    { value: "Peptide Name", label: "Peptide Name" },
    { value: "Replicate", label: "Replicate" },
    { value: "PeptidePeakRatio", label: "Peptide Peak Ratio" },
    { value: "Peptide Retention Time", label: "Peptide Retention Time" },
    { value: "Protein", label: "Protein" },
    { value: "Quantification", label: "Quantification" },
    { value: "Quant Group Avg", label: "Quant Group Avg" },
    { value: "Ratio To Standard", label: "Ratio To Standard" },
    { value: "Ratio Group Avg", label: "Ratio Group Avg" },
  ];

  return (
    <>
      <Select
      placeholder="Filter Columns..."
        isMulti={true}
        onChange={(e) => selectFunction(e)}
        options={options}
      />
    </>
  );
}