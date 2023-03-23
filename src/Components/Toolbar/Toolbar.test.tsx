import { render, screen } from '@testing-library/react';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  it('should render correctly', () => {
    render(<Toolbar />);
    expect(screen.getByText('PaintIT')).toBeInTheDocument();
  });
});
