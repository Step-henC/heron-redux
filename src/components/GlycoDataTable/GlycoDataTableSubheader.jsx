import Select from 'react-select';
import React from 'react';

export default function GlycoDataTableSubheader({selectFunction}){
const options = [
  { value: 'Protein Name', label: 'Protein Name' },
  { value: 'Replicate Name', label: 'Replicate Name' },
  {
    value: 'Peptide Sequence',
    label: 'Peptide Sequence',
  },
  { value: 'Precursor', label: 'Precursor' },
  { value: 'Total Area', label: 'Total Area' },
  { value: 'Isotope Dist Rank', label: 'Isotope Dist Rank' },
  { value: 'Isotope Dist Index', label: 'Isotope Dist Index' },
  { value: 'Isotope Dist Proportion', label: 'Isotope Dist Proportion' },
  { value: 'Best Retention Time', label: 'Best Retention Time' },
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