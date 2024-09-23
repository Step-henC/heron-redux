import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { isEmpty, uniqueId } from 'lodash';
import Form from 'react-bootstrap/Form';

import {
  ACCEPTABLE_FILE_FORMATS,
  BAD_LIST_PATTERN,
  BAD_RUNS_PLACEHOLDER,
} from '../../utils/acceptablefileformat';
import './quantformpage.css';
import {
  convertBadSamplesToOutlierList,
  validateQuantFile,
} from './QuantFormPageUtils';
import {resetQuantForm, setQuantFormFilled,setFileData, setOutlierSamples, setReplicateNumber} from '../../redux/quantformSlice'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
export default function QuantFormPage() {
  const [isAcceptableFormat, setIsAcceptableFormat] = useState(true);
  const [isFileProcessedSuccess, setIsFileProcessedSuccess] = useState(true);
  const [inputKey, setInputKey] = useState(uniqueId());
  const [isBadSamplesPresent, setIsBadSamplesPresent] = useState(false);
  const [badSampleString, setBadSampleString] = useState('');
  const [charactersRemaining, setCharactersRemaining] = useState(1000);
  const [badListFormatAccepted, setBadListFormatAccepted] = useState(true);
  const [noFileMessage, setNoFileMessage] = useState(false);
  const [showReplicateMessage, setShowReplicateMessage] = useState(false);
  const [isAnalyzeButtonDisabled, setIsAnalyzeButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const quantFormData = useSelector((state) => state.quantform)
  const technicalReplicateAria =
    'Does each sample have' + quantFormData.replicateNumber === 0
      ? '1'
      : quantFormData.replicateNumber + 'replicates';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successValidateCallback = (fileData) => {
    dispatch(setFileData(fileData));
    setIsFileProcessedSuccess(true);
  };

  const errorValidateCallBack = () => {
    setIsFileProcessedSuccess(false);
  };

  const dataIsValidNavigateToCharts = () => {
    // prevent users spamming submit button
    setIsAnalyzeButtonDisabled(true);
    // reset file input
    setInputKey(uniqueId);
    dispatch(setQuantFormFilled({bool: true}))
    navigate(`/quant/charts`);
  };

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile === undefined) {
      dispatch(setFileData([]));
      return;
    }

    if (uploadedFile && !ACCEPTABLE_FILE_FORMATS.includes(uploadedFile.type)) {
      setIsAcceptableFormat(false);
      return;
    } else {
      setIsAcceptableFormat(true);
    }

    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      error: () => setIsFileProcessedSuccess(false),
      complete: (results) =>
        validateQuantFile(
          results.data,
          () => successValidateCallback(results.data),
          () => errorValidateCallBack()
        ),
    });

    //https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
  };

  const handleGoodRun = () => {
    setIsBadSamplesPresent(!isBadSamplesPresent);
  };

  const handleTechnicalReplicate = (e) => {
    dispatch(setReplicateNumber({ number: parseInt(e.target.value) }));
    setShowReplicateMessage(false);
  };

  const handleBadSampleList = (e) => {
    setBadSampleString(e.target.value);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // check if there is a file first
    if (isEmpty(quantFormData.fileData)) {
      setNoFileMessage(true);
      return;
    }

    //check if they chose a replicate
    if (quantFormData.replicateNumber === 0) {
      // we want a separate state variable for this to evaluate only on submit.
      // otherwise error will always show until replicate number is chosen
      setShowReplicateMessage(true);
      return;
    }

    //if first two fields are good, check if the all samples have same replicate num
    if (isAcceptableFormat && isFileProcessedSuccess ) {
      setIsLoading(true)
      //if all samples have replicate num, process data
      if (isBadSamplesPresent === false) {
        // prevents multiple calls with enter key (spamming)
        dataIsValidNavigateToCharts();
      } else {
        //test if the list of samples matches the accepted format

        //if format is acceptable
        const isUserBadSampleInputValid = BAD_LIST_PATTERN.test(
          badSampleString.trim()
        );
        if (isUserBadSampleInputValid) {
          //process data
          const outlierSampleList =
            convertBadSamplesToOutlierList(badSampleString);
          if (!isEmpty(outlierSampleList)) {
            dispatch(setOutlierSamples(outlierSampleList));
          }
          dataIsValidNavigateToCharts();
        } else {
          setBadListFormatAccepted(isUserBadSampleInputValid);
          setIsLoading(false)
          return;
        }
      }
    }
  };

  const handleCancel = () => {
   dispatch(resetQuantForm())
    navigate('/');
  };

  useEffect(() => {
    setCharactersRemaining(1000 - badSampleString.split('').length);
  }, [badSampleString]);

  useEffect(() => {
    // on file upload,
    // if file in sessionstorage,
    // reset when you return to upload page
    // persistor.purge() will not work here
   dispatch(resetQuantForm())

    return () => {
      setInputKey(uniqueId)
    }
  }, []);

  return (
    <>
    {isLoading && (<LoadingSpinner />)}
    <form id="csv-elem" aria-label="form to upload and submit csv">
      <ul className="wrapper">
        <li className="form-row-title">
          <h2>Upload Skyline File</h2>
        </li>
        <li className="form-row">
          <label htmlFor="file-input">Upload File</label>
          <input
            type="file"
            accept={ACCEPTABLE_FILE_FORMATS}
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
              select a file of type CSV.
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
              role="alert"
              aria-label="Error processing selected file"
              style={{ color: 'red' }}
            >
              Please choose a file.
            </p>
          </li>
        )}

        <li className="form-row">
          <label aria-label="select number of replicates" htmlFor="rep-num">
            Number of Technical Replicates
          </label>
          <select
            id="rep-num"
            defaultValue={0}
            value={quantFormData.replicateNumber}
            onChange={(e) => handleTechnicalReplicate(e)}
          >
            <option value={0}></option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </li>
        {showReplicateMessage && (
          <li className="form-col">
            <p
              role="alert"
              aria-label="Replicate Size not selected"
              style={{ color: 'red' }}
            >
              Error. Number of technical replicates has not been selected.
              Please select a number of technical replicates.
            </p>
          </li>
        )}
        <li className="form-row">
          <Form.Label htmlFor="good-run" aria-label={technicalReplicateAria}>
            {quantFormData.replicateNumber > 1 ? 'Are' : 'Is'} there{' '}
            <strong>{quantFormData.replicateNumber === 0 ? 1 : quantFormData.replicateNumber}</strong>{' '}
            replicate
            {quantFormData.replicateNumber > 1 ? 's' : ''} for all samples in the document?
          </Form.Label>
          <Form.Check
            id="good-run"
            onChange={handleGoodRun}
            checked={!isBadSamplesPresent}
            type="switch"
            label={!isBadSamplesPresent ? 'Yes' : 'No'}
          ></Form.Check>
        </li>

        {isBadSamplesPresent && (
          <li className="form-col">
            <label
              aria-describedby="bad-sample-list-requirements"
              htmlFor="bad-sample-list"
            >
              Provide List of Samples without the Specified Number of Replicates
            </label>
            <br />
            <small id="bad-sample-list-requirements">
              {BAD_RUNS_PLACEHOLDER}
            </small>
            {!badListFormatAccepted && (
              <small aria-label="double check provided samples">
                <strong>
                  Names may include letters, numbers, underscores and hyphens.
                  Make sure there is a space after each comma.{' '}
                  <a href="/">For more clarity, clck here</a>
                </strong>
              </small>
            )}
            <textarea
              onKeyDown={(e) => handleBadSampleList(e)}
              //wrap="off"
              placeholder="ex: (sample1, sample2) (sample3)"
              name="bad-sample-list"
              className={
                badListFormatAccepted
                  ? 'bad-sample-input-class'
                  : 'bad-sample-input-class-error'
              }
              maxLength={1000}
              required
              type="text"
              value={badSampleString}
              onChange={(e) => handleBadSampleList(e)}
              id="bad-sample-list"
              aria-describedby="bad-sample-list-requirements"
            ></textarea>
            {charactersRemaining > 0 ? (
              <small>
                {charactersRemaining} character
                {charactersRemaining > 1 ? 's' : ''} remaining
              </small>
            ) : (
              <small>No characters remaining</small>
            )}
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
            disabled={isAnalyzeButtonDisabled}
            onClick={handleAnalyze}
            type="submit"
          >
            Analyze
          </button>
        </li>
      </ul>
    </form>
    </>
  );
}



