import Select from 'react-select';
import React from 'react';

export default function AveragesTableSubheader({ selectFunction }) {
  const options = [
    { value: 'Peptide', label: 'Peptide' },
    { value: 'Replicate Name', label: 'Replicate Name' },
    {
      value: 'Quantification Average (X axis)',
      label: 'Quantification Average (X axis)',
    },
    { value: 'Quantification STDEV', label: 'Quantification STDEV' },
    { value: 'Quantification CV', label: 'Quantification CV' },
    { value: 'Ratio Average (Y axis)', label: 'Ratio Average (Y axis)' },
    { value: 'Ratio STDEV', label: 'Ratio STDEV' },
    { value: 'Ratio CV', label: 'Ratio CV' },
  ];

  return (
    <Select
      placeholder="Filter Columns..."
      isMulti={true}
      onChange={(e) => selectFunction(e)}
      options={options}
    />
  );
}
