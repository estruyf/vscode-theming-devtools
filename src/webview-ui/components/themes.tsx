import * as React from 'react';

export interface IThemesProps {
  themes?: string[];
  selectedTheme: string | null;
  setSelectedTheme: (theme: string) => void;
}

export const Themes: React.FunctionComponent<IThemesProps> = ({ themes, selectedTheme, setSelectedTheme }: React.PropsWithChildren<IThemesProps>) => {
  return (
    <>
      {
        themes && themes.length > 0 ? (
          <>
            <h3 className={`text-xl`}>Select a theme for comparison</h3>
            <select 
              className={`mt-4 text-black px-2 py-1`}
              onChange={(e) => setSelectedTheme(e.currentTarget.value)}>
              <option value="NOTHING_SELECTED"></option>

              {
                themes?.map((theme) => (
                  <option
                    key={theme}
                    value={theme}
                    selected={theme === selectedTheme}
                  >
                    {theme}
                  </option>
                ))
              }
            </select>
          </>
        ) : (
          null
        )
      }
    </>
  );
};