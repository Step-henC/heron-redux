import { render, screen } from '@testing-library/react';
import HeaderLayout from './HeaderLayout';

// need navigate mocking to pass test
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Header Layout', () => {
  it('Should pass child props', () => {
    render(
      <HeaderLayout>
        <div data-testid="child-hdr-lay">
          I am a child div with whatever props
        </div>
      </HeaderLayout>
    );

    expect(screen.getByTestId('child-hdr-lay')).toHaveTextContent(
      'I am a child div with whatever props'
    );
  });
});
