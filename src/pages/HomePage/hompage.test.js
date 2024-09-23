import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage Tests', () => {
  const setUp = () => {
    const utils = render(<HomePage />);

    return {
      ...utils,
    };
  };
  it('Should render without crashing', () => {
    setUp();
    expect(screen.getByAltText('logo')).toBeVisible()

    expect(screen.getByText('Start Here')).toBeInTheDocument();
  });

  it('Start button should scroll', () => {
     setUp();

    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const startButton = screen.getByText('Start Here');

    expect(startButton).toBeInTheDocument();

    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    fireEvent.click(startButton);

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);

  });
});
