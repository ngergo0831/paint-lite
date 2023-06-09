import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faHand } from '@fortawesome/free-regular-svg-icons';
import { ToolbarItem } from '../ToolbarItem/ToolbarItem';
import { DrawMode } from '../../../constants';

export const ToolbarShapes = () => {
  return (
    <>
      <ToolbarItem icon={faMinus} context={DrawMode.LINE} />
      <ToolbarItem icon={faSquare} context={DrawMode.RECTANGLE} />
      <ToolbarItem icon={faHand} context={DrawMode.SELECT} />
    </>
  );
};
