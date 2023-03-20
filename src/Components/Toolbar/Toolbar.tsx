import { ToolbarShapes } from './ToolbarShapes/ToolbarShapes';
import * as S from './Toolbar.styles';

export const Toolbar = () => {
  return (
    <S.ToolbarContainer>
       <S.Title>PaintIT</S.Title>
      <ToolbarShapes />
    </S.ToolbarContainer>
  );
};
