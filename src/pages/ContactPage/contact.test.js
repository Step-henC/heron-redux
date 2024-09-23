import ContactPage from "./ContactPage";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))


describe('Contact Page Tests', () => {

  afterEach(cleanup)

  it('Should Render without crashing', () => {
    render(<ContactPage />)
    expect(screen.getByText('Contact Us')).toBeVisible();
  })

  it('Email should match pattern', () => {
    render(<ContactPage />)
    const emailInput = screen.getByLabelText('Your Email: (*)')
    const submitButton = screen.getByTestId('contact-submit')
    expect(emailInput).toBeVisible();

    fireEvent.change(emailInput, {value: 'no'});
    fireEvent.click(submitButton);

    expect(screen.getByText('Error: Please provide a valid email')).toBeVisible();

  })

  it('Fields should not be empty', () =>{
    render(<ContactPage/>)
    const submitButton = screen.getByTestId('contact-submit')

    const emailInput = screen.getByLabelText('Your Email: (*)')
    expect(emailInput.value).toBe('')

    // trigger error 
    fireEvent.click(submitButton);

    expect(screen.getByText('Error: Please provide a valid email')).toBeVisible();
    expect(screen.getByTestId('message-err')).toBeVisible();
    expect(screen.getByTestId('subject-err')).toBeVisible();

  })

  it('Cancel button should route home', () => {
    render(<ContactPage />)

    const cancelButton = screen.getByTestId('contact-cancel');

    expect(mockUseNavigate).not.toHaveBeenCalled();

    fireEvent.click(cancelButton)

    expect(mockUseNavigate).toHaveBeenCalledWith('/')
  })
})