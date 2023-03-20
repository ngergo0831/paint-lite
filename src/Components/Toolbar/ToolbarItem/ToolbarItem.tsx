import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import * as S from './ToolbarItem.styles';

interface ToolbarItemProps {
  icon: IconDefinition;
  label: string;
  size?: SizeProp;
}

export const ToolbarItem = ({ icon, label, size = 'xl' }: ToolbarItemProps) => {
  return (
    <S.ToolbarItemContainer>
      <FontAwesomeIcon icon={icon} size={size} />
      <S.ToolbarItemLabel>{label}</S.ToolbarItemLabel>
    </S.ToolbarItemContainer>
  );
};
