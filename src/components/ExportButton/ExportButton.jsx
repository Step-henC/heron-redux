import React from 'react';
import './exportbutton.css';
export default function ExportButton({ buttonText, onExport, disabled }) {
  //need this class to style table export button
  return (
    <button 
    disabled={disabled}
     className="button-button-submit" onClick={() => onExport()}>
      {buttonText}
    </button>
  );
}
