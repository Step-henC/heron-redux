

import { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { uniqueId, isEmpty } from 'lodash';
import {
  ACCEPTABLE_GLYCO_FORMATS,
} from '../../../utils/acceptablefileformat';
import './glycopage.css'
import { resetGlycoForm, setFileData, setIsFormFilled } from '../../../redux/glycoFormSlice';
import {validateGlycoFile} from './glycoPageUtils'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
export default function GlycoFormPage() {
  const [isAcceptableFormat, setIsAcceptableFormat] = useState(true);
  const [isFileProcessedSuccess, setIsFileProcessedSuccess] = useState(true);
  const [inputKey, setInputKey] = useState(Date.now);
  const [noFileMessage, setNoFileMessage] = useState(false);
  const [isAnalyzeButtonDisabled, setIsAnalyzeButtonDisabled] = useState(false);
  const [isFormParsePending, startFormParseTransition] = useTransition();
  const glycoFormData = useSelector((state) => state.glycoform)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successValidateCallback = (fileData) => {
    dispatch(setFileData(fileData));
    setIsFileProcessedSuccess(true)
    setIsAcceptableFormat(true)
    setNoFileMessage(false)
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
    dispatch(resetGlycoForm())
    setIsFileProcessedSuccess(false);
  };

  const parseError = () => {
    setIsFileProcessedSuccess(false)
    setNoFileMessage(true)
    dispatch(resetGlycoForm())
  }

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile === undefined){
      dispatch(resetGlycoForm())
      return;
    }

    if (uploadedFile && !ACCEPTABLE_GLYCO_FORMATS.includes(uploadedFile.type)) {
        setIsAcceptableFormat(false);
        return;
      } else {
        setIsAcceptableFormat(true);
      }



      startFormParseTransition(() => {
        Papa.parse(uploadedFile, {
          header: true,
          skipEmptyLines: true,
          error: () => parseError(),
          complete: (results) => validateGlycoFile(
            results.data,
            (data) => successValidateCallback(data),
            () => errorValidateCallBack()
          )
        })

      })
 
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
    if (isAcceptableFormat && isFileProcessedSuccess && !noFileMessage) {

    
        dataIsValidNavigateToCharts()
    }
  };

  const handleCancel = () => {
    dispatch(resetGlycoForm());
    navigate('/');
  };

  useEffect(() => {
    dispatch(resetGlycoForm());

    return () => {
      setInputKey(uniqueId)
    }
  }, [])

  return (
    <div className='glyco-main'>
   {(isAnalyzeButtonDisabled || isFormParsePending) && <LoadingSpinner />}
   <h1 className='glyco-hd'>Glycosylation</h1>
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
    </div>
  );
}


