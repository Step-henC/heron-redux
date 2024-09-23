import {
  render,
  fireEvent,
  screen,
  cleanup,
} from '@testing-library/react';
import QuantPage from './QuantFormPage';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import quantformSlice, { setFileData, setQuantForm, setReplicateNumber } from '../../redux/quantformSlice';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Quant Form Page Tests', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        quantform: quantformSlice,
      },
    });
    store.dispatch(setQuantForm({isFormFilled: false, fileData: [{Protein: 'AJDKS'}], replicateNumber: 3, outlierInput: ''}))
    
  });

  afterEach(cleanup);

  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <QuantPage />
      </Provider>
    );

    return {
      ...utils,
    };
  };

  it('Should Render without crashing', () => {
    setup();
    expect(screen.getByText('Upload Skyline File')).toBeVisible();
  });
  it('Cancel should route home', () => {
    setup();
    const cancelButton = screen.getByText('Cancel');

    fireEvent.click(cancelButton);
    expect(store.getState().quantform.replicateNumber).toBe(0)

    expect(mockUseNavigate).toHaveBeenCalledWith('/');
  });

  it('File should upload', () => {
    setup();

    const file = new File(
      [
        `Peptide,Protein,Replicate,Ratio To Standard,Peptide Retention Time,Quantification,Peptide Peak Found Ratio
TPLTATLSK,SNC73 protein (Pep. 1),20240205_Orbi_IG_STD1Mix_1,0.0513,25.65,86.4313 fmol,0.4
`,
      ],
      'mass-spec-run.csv',
      { type: 'text/csv' }
    );

    const fileInputElement = screen.getByLabelText('Upload File');

    userEvent.upload(fileInputElement, file);
    expect(fileInputElement.files[0]).toStrictEqual(file);
  });
});
