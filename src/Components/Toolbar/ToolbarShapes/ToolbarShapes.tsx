import * as ToolbarStyles from '../Toolbar.styles';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { ToolbarItem } from '../ToolbarItem/ToolbarItem';

export const ToolbarShapes = () => {
  return (
    <>
      <ToolbarStyles.Title>Shapes</ToolbarStyles.Title>
      <ToolbarItem icon={faMinus} label="Line" />
      <ToolbarItem icon={faSquare} label="Rect" />
    </>
  );
};
