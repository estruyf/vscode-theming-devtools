import * as React from 'react'
import { CodeTheme } from '../../models/CodeTheme';

interface ICodeThemeContext {
  name: string | undefined;
  theme: CodeTheme | undefined;
}

const CodeThemeContext = React.createContext<ICodeThemeContext | undefined>(undefined);

interface ICodeThemeProviderProps extends ICodeThemeContext {}

const CodeThemeProvider: React.FunctionComponent<ICodeThemeProviderProps> = ({ name, theme, children }: React.PropsWithChildren<ICodeThemeProviderProps>) => {
  return <CodeThemeContext.Provider value={{ name, theme }}>{children}</CodeThemeContext.Provider>
};

const useCodeTheme = (): ICodeThemeContext => {
  const themeCtx = React.useContext(CodeThemeContext);

  if (themeCtx === undefined) {
    throw new Error('useCodeTheme must be used within the CodeThemeProvider');
  }

  return {
    ...themeCtx
  };
};

CodeThemeContext.displayName = 'CodeThemeContext';
CodeThemeProvider.displayName = 'CodeThemeProvider';

export { CodeThemeProvider, useCodeTheme };