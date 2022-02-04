import * as React from 'react'
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';

const StyleContext = React.createContext<VSCodeStyleProperty[] | undefined>(undefined);

interface IStyleProviderProps {
  styles?: VSCodeStyleProperty[];
}

const StyleProvider: React.FunctionComponent<IStyleProviderProps> = ({ styles, children }: React.PropsWithChildren<IStyleProviderProps>) => {
  return <StyleContext.Provider value={styles}>{children}</StyleContext.Provider>
};

const useStyles = (): VSCodeStyleProperty[] => {
  const styles = React.useContext(StyleContext);

  if (styles === undefined) {
    throw new Error('useStyles must be used within the StyleProvider');
  }

  return styles;
};

StyleContext.displayName = 'StyleContext';
StyleProvider.displayName = 'StyleProvider';

export { StyleProvider, useStyles };