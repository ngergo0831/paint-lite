import { createContext } from 'react';
import { DrawMode } from '../constants';

interface DrawModeProviderProps {
  children: JSX.Element;
}

const DrawModeContext = createContext(DrawMode.LINE);

export const DrawModeProvider = ({ children }: DrawModeProviderProps) => {
  return <DrawModeContext.Provider value={DrawMode.LINE}>{children}</DrawModeContext.Provider>;
};
