import glycoFormSlice, {setFileData, setIsFormFilled, resetGlycoForm} from './glycoFormSlice';

const initialState = {
  isFormFilled: false,
  fileData: [],
};

describe('Glyco Form Tests', () => {
  it('should return file form filled', () => {
    const expected = { ...initialState, isFormFilled: true };

    expect(
      glycoFormSlice(undefined, setIsFormFilled({ bool: true }))
    ).toEqual(expected);
  });

  it('should set file data', () => {
    const mockFileData = [
      { Peptide: 'DJSKDJ', QuantAvg: '22' },
      { Replicate: 'dsajdkaj', STDEV: '323' },
    ];

    const expected = { ...initialState, fileData: mockFileData };

    expect(glycoFormSlice(undefined, setFileData(mockFileData))).toStrictEqual(
      expected
    );
  });



  it('should reset glyco form to initial state', () => {
    expect(glycoFormSlice(undefined, resetGlycoForm())).toStrictEqual(
      initialState
    );
  });
});
