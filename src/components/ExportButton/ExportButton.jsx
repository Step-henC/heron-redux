import React from 'react';
import './exportbutton.css';
export default function ExportButton({ buttonText, onExport }) {
  //need this class to style table export button
  return (
    <button className="button-button-submit" onClick={() => onExport()}>
      {buttonText}
    </button>
  );
}
