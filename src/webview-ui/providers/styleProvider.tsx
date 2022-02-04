import * as React from 'react'
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';

interface IStyleContext {
  styles: VSCodeStyleProperty[] | undefined;
  themes: string[] | undefined;
}

const StyleContext = React.createContext<IStyleContext | undefined>(undefined);

interface IStyleProviderProps {
  styles?: VSCodeStyleProperty[];
  themes?: string[];
}

const StyleProvider: React.FunctionComponent<IStyleProviderProps> = ({ styles, themes, children }: React.PropsWithChildren<IStyleProviderProps>) => {
  return <StyleContext.Provider value={{ styles, themes }}>{children}</StyleContext.Provider>
};

const useStyles = (): IStyleContext => {
  const styleCtx = React.useContext(StyleContext);

  if (styleCtx === undefined) {
    throw new Error('useStyles must be used within the StyleProvider');
  }

  return {
    ...styleCtx
  };
};

StyleContext.displayName = 'StyleContext';
StyleProvider.displayName = 'StyleProvider';

export { StyleProvider, useStyles };