import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import * as S from './ToolbarItem.styles';
import { DrawMode } from '../../../constants';
import { useContext } from 'react';
import { DrawModeContext } from '../../../Providers/DrawModeProvider';

interface ToolbarItemProps {
  icon: IconDefinition;
  context: DrawMode;
  size?: SizeProp;
}

export const ToolbarItem = ({ icon, context, size = 'xl' }: ToolbarItemProps) => {
  const { mode, setMode } = useContext(DrawModeContext);

  const handleClick = () => {
    setMode(context);
  };

  return (
    <S.ToolbarItemContainer onClick={handleClick} isActive={mode === context} data-testid={`toolbar-item-${context}`}>
      <FontAwesomeIcon icon={icon} size={size} />
      <S.ToolbarItemLabel>{context}</S.ToolbarItemLabel>
    </S.ToolbarItemContainer>
  );
};
