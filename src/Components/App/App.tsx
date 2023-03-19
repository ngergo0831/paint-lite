import { Canvas } from '../Canvas/Canvas';
import { Toolbar } from '../Toolbar/Toolbar';

import * as S from './App.styles';

function App() {
  return (
    <S.AppContainer>
      <Toolbar />
      <Canvas />
    </S.AppContainer>
  );
}

export default App;
