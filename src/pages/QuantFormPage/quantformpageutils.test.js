import Papa from 'papaparse';
import { convertBadSamplesToOutlierList, validateQuantFile } from './QuantFormPageUtils';

const mockErrorCallback = jest.fn();
const mockSuccessCallback = jest.fn();

describe('Quant Utils test', () => {
  it('Should parse file', () => {
    const csvString = `Peptide,Protein,Replicate,Ratio To Standard,Peptide Retention Time,Quantification,Peptide Peak Found Ratio
    TDOIADKL,SN8SL protein (Pep. 1),20240205_Mega_IG_STD1Mix_1,0.9513,27.65,56.4313 fmol,0.9
    `;

    let resultFile;

    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      error: () => {},
      complete: (results) => {
        resultFile = results.data;
      },
    });

    validateQuantFile(resultFile, mockSuccessCallback, mockErrorCallback);

    expect(mockErrorCallback).toHaveBeenCalledTimes(0);
    expect(mockSuccessCallback).toHaveBeenCalledTimes(1);
  });

  it('Should Require all key props', () => {
    // changed Peak Found Ratio  -> Peak UNFOUND Ratio
    const csvString = `Peptide,Protein,Replicate,Ratio To Standard,Peptide Retention Time,Quantification,Peptide Peak UNFOUND Ratio
  TDOIADKL,SN8SL protein (Pep. 1),20240205_Mega_IG_STD1Mix_1,0.9513,27.65,56.4313 fmol,0.9
  `;

    let resultFile;

    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      error: () => {},
      complete: (results) => {
        resultFile = results.data;
      },
    });

    validateQuantFile(resultFile, mockSuccessCallback, mockErrorCallback);

    expect(mockErrorCallback).toHaveBeenCalledTimes(1);
    expect(mockSuccessCallback).toHaveBeenCalledTimes(0);
  });

  it('Should Reject Empty String', () => {
    const csvString = ``;

    let resultFile;

    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      error: () => {},
      complete: (results) => {
        resultFile = results.data;
      },
    });

    validateQuantFile(resultFile, mockSuccessCallback, mockErrorCallback);

    expect(mockErrorCallback).toHaveBeenCalledTimes(1);
    expect(mockSuccessCallback).toHaveBeenCalledTimes(0);
  });

  it('Should convert list of bad samples string to a 2D array of names', () => {
    const badSamplesString = `(20240205_Orbi_IG_STD1Mix_1)(20240202_Orbi_IG_600ng_pIgA_BJCH270_2,20240202_Orbi_IG_600ng_pIgA_BJCH270_3
)`;


    const expected =  [
      [ '20240205_Orbi_IG_STD1Mix_1' ],
      [
        '20240202_Orbi_IG_600ng_pIgA_BJCH270_2,20240202_Orbi_IG_600ng_pIgA_BJCH270_3'
      ]
    ]

      const actual = convertBadSamplesToOutlierList(badSamplesString)
    expect(expected).toStrictEqual(actual);
  });
  it('Should convert single bad sample string to a 2D array of names', () => {
    const badSamplesString = `(20240205_Orbi_IG_STD1Mix_1)`;

    
    const expected =  [
      [ '20240205_Orbi_IG_STD1Mix_1' ]
    ]

      const actual = convertBadSamplesToOutlierList(badSamplesString)
    expect(expected).toStrictEqual(actual);
  });
});
