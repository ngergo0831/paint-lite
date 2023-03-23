// canvas renders with expected height and width

import { render, screen } from '@testing-library/react';
import { ToolbarWidth } from '../../constants';
import { Canvas } from './Canvas';
import 'jest-canvas-mock';

it('canvas renders with expected height and width', () => {
  render(<Canvas />);

  const canvas = screen.getByRole('canvas');

  expect(canvas).toHaveAttribute('height', window.innerHeight.toString());
  expect(canvas).toHaveAttribute('width', (window.innerWidth - ToolbarWidth).toString());
});
