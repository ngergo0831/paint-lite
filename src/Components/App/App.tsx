import { DrawModeProvider } from '../../Providers/DrawModeProvider';
import { Canvas } from '../Canvas/Canvas';
import { Toolbar } from '../Toolbar/Toolbar';

import * as S from './App.styles';

function App() {
  return (
    <DrawModeProvider>
      <S.AppContainer>
        <Toolbar />
        <Canvas />
      </S.AppContainer>
    </DrawModeProvider>
  );
}

export default App;
