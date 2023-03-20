import { createContext, useState } from 'react';
import { DrawMode } from '../constants';

interface DrawModeProviderProps {
  children: JSX.Element;
}

export const DrawModeContext = createContext({
  mode: DrawMode.LINE,
  setMode: (mode: DrawMode) => {}
});

export const DrawModeProvider = ({ children }: DrawModeProviderProps) => {
  const [mode, setMode] = useState(DrawMode.LINE);
  return <DrawModeContext.Provider value={{ mode, setMode }}>{children}</DrawModeContext.Provider>;
};
