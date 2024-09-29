import quantformSlice, {
  setQuantFormFilled,
  setOutlierSamples,
  setFileData,
  setReplicateNumber,
  resetQuantForm,
} from './quantformSlice';
import { convertBadSamplesToOutlierList } from '../pages/Quant/QuantFormPage/QuantFormPageUtils';

const initialState = {
  isFormFilled: false,
  fileData: [],
  replicateNumber: 0,
  outlierInput: [[]],
};

describe('Quant Form Tests', () => {
  it('should return file form filled', () => {
    const expected = { ...initialState, isFormFilled: true };

    expect(
      quantformSlice(undefined, setQuantFormFilled({ bool: true }))
    ).toEqual(expected);
  });

  it('should return outlier samples', () => {
    // simulates how this reducer will be used
    const input = '(see, spot)(run)(fast)(dog, ran)';
    const expectedOutliers = [
      ['see', 'spot'],
      ['run'],
      ['fast'],
      ['dog', 'ran'],
    ];

    const expected = { ...initialState, outlierInput: expectedOutliers };

    // testing this function too
    const actual = convertBadSamplesToOutlierList(input);

    expect(
      quantformSlice(undefined, setOutlierSamples(expectedOutliers))
    ).toStrictEqual(expected);
    expect(expectedOutliers).toEqual(actual);
  });

  it('should set file data', () => {
    const mockFileData = [
      { Peptide: 'DJSKDJ', QuantAvg: '22' },
      { Replicate: 'dsajdkaj', STDEV: '323' },
    ];

    const expected = { ...initialState, fileData: mockFileData };

    expect(quantformSlice(undefined, setFileData(mockFileData))).toStrictEqual(
      expected
    );
  });

  it('should set replicate number', () => {
    const mockReplicateNumber = 8;

    const expected = { ...initialState, replicateNumber: mockReplicateNumber };

    expect(
      quantformSlice(
        undefined,
        setReplicateNumber({ number: mockReplicateNumber })
      )
    ).toStrictEqual(expected);
  });

  it('should reset quant form to initial state', () => {
    expect(quantformSlice(undefined, resetQuantForm())).toStrictEqual(
      initialState
    );
  });
});
