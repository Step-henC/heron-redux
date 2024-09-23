import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

describe('Header Tests', () => {

  const setUp = () => {
    render(<Header/>)
  }

  it('Should render without crashing', () => {
    setUp()

    expect(screen.getByAltText('heron logo')).toBeVisible();
  })

  it('Logo should route home', () => {
    setUp();

    const logoDiv = screen.getByTestId('logo-div-btn')
    expect(logoDiv).toBeVisible();

    fireEvent.click(logoDiv)

    expect(mockUseNavigate).toHaveBeenCalledWith('/')
  })

  it('Header Links should render', () => {
    setUp();

    const quantLinks = screen.getAllByText('Quantification')
    const glycoLinks = screen.getAllByText('Glycosylation')
    const contactLinks = screen.getAllByText('Contact')
    const documentationDropdowns = screen.getAllByText('Documentation')


    // second values in list are in offcanvas and are visible to the tests
    expect(quantLinks[0]).toBeVisible();
    expect(glycoLinks[0]).toBeVisible();
    expect(contactLinks[0]).toBeVisible();
    expect(documentationDropdowns[0]).toBeVisible();

    fireEvent.click(documentationDropdowns[0]);

    expect(screen.getByText('Protocol Publication')).toBeVisible()

  })
})