

import { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uniqueId, isEmpty } from 'lodash';
import { ACCEPTABLE_GLYCO_FORMATS } from '../../utils/acceptablefileformat'; //HIV has same format as Glyco
import { resetHivForm, setFileData, setIsFormFilled } from '../../redux/hivFormSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './hiv.css'
import readXlsxFile, { readSheetNames } from 'read-excel-file';

export default function HIVFormPage() {
  const [isAcceptableFormat, setIsAcceptableFormat] = useState(true);
  const [isFileProcessedSuccess, setIsFileProcessedSuccess] = useState(true);
  const [inputKey, setInputKey] = useState(Date.now);
  const [noFileMessage, setNoFileMessage] = useState(false);
  const [isAnalyzeButtonDisabled, setIsAnalyzeButtonDisabled] = useState(false);
  const [isFormParsePending, startFormParseTransition] = useTransition();
  const hivFormData = useSelector((state) => state.hivForm)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successValidateCallback = (fileData) => {
    setIsFileProcessedSuccess(true)
    setIsAcceptableFormat(true)
    setNoFileMessage(false)
    dispatch(setFileData(fileData))
  }

  const dataIsValidNavigateToCharts = () => {
    // prevent users spamming submit button
    setIsAnalyzeButtonDisabled(true);
    // reset file input
    setInputKey(uniqueId);
    dispatch(setIsFormFilled({bool: true}))
    navigate(`/hiv/charts`);
  };

  const errorValidateCallBack = () => {
    dispatch(resetHivForm())
    setIsFileProcessedSuccess(false);
    setInputKey(uniqueId)
  };

  const handleFile = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile === undefined){
      errorValidateCallBack()
      return;
    }

    if (!ACCEPTABLE_GLYCO_FORMATS.includes(uploadedFile.type)) {
      errorValidateCallBack()
        return;
      } 

      const sheetNames = await readSheetNames(uploadedFile)
      // i do not have any other identifiers other than sheet count
      // if no sheet count, probably not the form we are looking for
      if (sheetNames.length !== 3) {
        errorValidateCallBack()
        return;
      } 
    
      startFormParseTransition(async () => {
      //add protein names from sheet one
      const proteinData = await readXlsxFile(uploadedFile, {sheet: 1})
      // add peptide names only from sheet two. So we can merge. 
      // all other vals should be same
       const peptideData = await readXlsxFile(uploadedFile, {sheet: 2})

       // Now protein is first val in row, and peptide name is last val in row
      const fileRows = proteinData.map((row, idx) => [...row, peptideData[idx][0]])
      successValidateCallback(fileRows)
      
      })
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isEmpty(hivFormData?.fileData)) {
      errorValidateCallBack()
      return;
    }

    // final check then navigate
    if (isAcceptableFormat && isFileProcessedSuccess && !noFileMessage) {
    
        dataIsValidNavigateToCharts()
    }
  };

  const handleCancel = () => {
    dispatch(resetHivForm());
    navigate('/');
  };

  useEffect(() => {
    dispatch(resetHivForm());

    return () => {
      setInputKey(uniqueId)
    }
  }, [])

  return (
    <div className='hiv-main'>
   {(isAnalyzeButtonDisabled || isFormParsePending) && <LoadingSpinner />}
   <h1 className='hiv-hd'>HIV</h1>
    <form id="csv-elem" aria-label="form to upload and submit csv">
      <ul className="wrapper">
        <li className="form-row-title">
          <h2>Upload CSV File</h2>
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
            disabled={isAnalyzeButtonDisabled || isFormParsePending}
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


