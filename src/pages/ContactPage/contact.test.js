import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContactPage from './ContactPage';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import contactFormSlice, {
  setFormIsFilled,
} from '../../redux/contactFormSlice';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Contact Page Tests', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        contactForm: contactFormSlice,
      },
    });
    store.dispatch(setFormIsFilled({ bool: true }));
  });
  afterEach(cleanup);

  const setup = () => render(
    <Provider store={store}>
      <ContactPage />
    </Provider>
  );

  it('Should Render without crashing', () => {
    setup();
    expect(screen.getByText('Contact Us')).toBeVisible();
  });

  it('Email should match pattern', () => {
    setup();
    const emailInput = screen.getByLabelText('Your Email: (*)');
    const submitButton = screen.getByTestId('contact-submit');
    expect(emailInput).toBeVisible();

    fireEvent.change(emailInput, { value: 'no' });
    fireEvent.click(submitButton);

    expect(
      screen.getByText('Error: Please provide a valid email')
    ).toBeVisible();
  });

  it('Fields should not be empty', () => {
    setup();
    const submitButton = screen.getByTestId('contact-submit');

    const emailInput = screen.getByLabelText('Your Email: (*)');
    expect(emailInput.value).toBe('');

    // trigger error
    fireEvent.click(submitButton);

    expect(
      screen.getByText('Error: Please provide a valid email')
    ).toBeVisible();
    expect(screen.getByTestId('message-err')).toBeVisible();
    expect(screen.getByTestId('subject-err')).toBeVisible();
  });

  it('Cancel button should route home', () => {
    setup();
    const cancelButton = screen.getByTestId('contact-cancel');

    expect(mockUseNavigate).not.toHaveBeenCalled();

    fireEvent.click(cancelButton);

    expect(mockUseNavigate).toHaveBeenCalledWith('/');
  });
});
