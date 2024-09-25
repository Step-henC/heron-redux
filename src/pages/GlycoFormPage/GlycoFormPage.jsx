

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { uniqueId, isEmpty } from 'lodash';
import {
  ACCEPTABLE_GLYCO_FORMATS,
} from '../../utils/acceptablefileformat';
import './glycopage.css'
import { resetGlycoForm, setFileData, setIsFormFilled } from '../../redux/glycoFormSlice';
import {parseFileDataInts, validateGlycoFile} from './glycoPageUtils'
export default function GlycoFormPage() {
  const [isAcceptableFormat, setIsAcceptableFormat] = useState(true);
  const [isFileProcessedSuccess, setIsFileProcessedSuccess] = useState(true);
  const [inputKey, setInputKey] = useState(Date.now);
  const [noFileMessage, setNoFileMessage] = useState(false);
  const [isAnalyzeButtonDisabled, setIsAnalyzeButtonDisabled] = useState(false);
  const glycoFormData = useSelector((state) => state.glycoform)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successValidateCallback = (fileData) => {
    dispatch(setFileData(parseFileDataInts(fileData)));
    setIsFileProcessedSuccess(true)
  }

  const dataIsValidNavigateToCharts = () => {
    // prevent users spamming submit button
    setIsAnalyzeButtonDisabled(true);
    // reset file input
    setInputKey(uniqueId);
    dispatch(setIsFormFilled({bool: true}))
    navigate(`/glyco/charts`);
  };

  const errorValidateCallBack = () => {
    setIsFileProcessedSuccess(false);
  };

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile && !ACCEPTABLE_GLYCO_FORMATS.includes(uploadedFile.type)) {
        setIsAcceptableFormat(false);
        return;
      } else {
        setIsAcceptableFormat(true);
      }

    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      error: () => setIsFileProcessedSuccess(false),
      complete: (results) => validateGlycoFile(
        results.data,
        (data) => successValidateCallback(data),
        () => errorValidateCallBack()
      )
    });
        //https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0

  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    e.stopPropagation();


    if (isEmpty(glycoFormData.fileData)) {
      setNoFileMessage(true);
      return;
    }

    // final check then navigate
    if (isAcceptableFormat && isFileProcessedSuccess) {
    
        dataIsValidNavigateToCharts()
    }
  };

  const handleCancel = () => {
    dispatch(setFileData([]));
    navigate('/');
  };

  useEffect(() => {
    dispatch(resetGlycoForm());

    return () => {
      setInputKey(uniqueId)
    }
  }, [])

  return (
    <form id="csv-elem" aria-label="form to upload and submit csv">
      <ul className="wrapper">
        <li className="form-row-title">
          <h2>Upload Skyline File</h2>
        </li>
        <li className="form-row">
          <label htmlFor="file-input">Upload File</label>
          <input
            type="file"
            accept={ACCEPTABLE_GLYCO_FORMATS}
            key={inputKey}
            onChange={handleFile}
            id="file-input"
          />
        </li>
        {!isAcceptableFormat && (
          <li className="form-col">
            <p
              aria-label="File format error. Not a valid CSV or XLSX file"
              style={{ color: 'red' }}
            >
              Error: The selected file is not an acceptable file format. Please
              select a CSV or xlsx file.
            </p>
          </li>
        )}
        {!isFileProcessedSuccess && (
          <li className="form-row">
            <p
              aria-label="Error processing selected file"
              style={{ color: 'red' }}
            >
              Error: Unable to process file. Please make sure file is valid.{' '}
              <a href="/support">Contact support here</a> if the issue
              continues.
            </p>
          </li>
        )}
        {noFileMessage && (
          <li className="form-col">
            <p
              aria-label="Error processing selected file"
              style={{ color: 'red' }}
            >
              Please choose a file.
            </p>
          </li>
        )}
        <li className="form-row-spacer">
          <button
            className="button-button-cancel"
            aria-label="cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="button-button-submit"
            aria-label="submit"
            onClick={handleAnalyze}
            disabled={isAnalyzeButtonDisabled}
            type="submit"
          >
            Analyze
          </button>
        </li>
      </ul>
    </form>
  );
}


