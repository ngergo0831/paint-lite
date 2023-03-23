import { fireEvent, render, screen } from '@testing-library/react';
import { DrawMode } from '../../../constants';
import { DrawModeContext, DrawModeProvider } from '../../../Providers/DrawModeProvider';
import { ToolbarShapes } from './ToolbarShapes';

it('should change DrawModeContext to select when the last button is clicked', () => {
  render(<ToolbarShapes />, { wrapper: DrawModeProvider });

  const lastButton = screen.getByTestId('toolbar-item-select');
  fireEvent.click(lastButton);

  expect(DrawModeContext).toEqual(DrawMode.SELECT);
});
