import * as React from 'react';
import { useMemo } from 'react';
import { useStyles } from '../providers/styleProvider';
import { Tabs } from './tabs';
import { Themes } from './themes';

export interface IHeaderProps {
  isDark: boolean;
  themeName: string | null | undefined;
  groups: string[];
  selectedGroup: string | null;
  setSelectedGroup: (group: string) => void;
  selectedTheme: string | null;
  setSelectedTheme: (theme: string) => void;
}

export const Header: React.FunctionComponent<IHeaderProps> = ({ isDark, themeName, groups, selectedGroup, setSelectedGroup, selectedTheme, setSelectedTheme }: React.PropsWithChildren<IHeaderProps>) => {
  const { styles, themes } = useStyles();

  if (!styles) { 
    return null;
  }

  const fgColor = useMemo(() => styles.find(({ property }) => property === "foreground")?.value, [styles]);
  const bgColor = useMemo(() => styles.find(({ property }) => property === "editorBackground")?.value, [styles]);
  const bgSideBar = useMemo(() => styles.find(({ property }) => property === "sideBarBackground")?.value, [styles]);
  const fontFamily = useMemo(() => styles.find(({ property }) => property === "editorFontFamily")?.value, [styles]);

  return (
    <div className="bg-gray-800 text-white pb-32" style={{ backgroundColor: isDark ? bgColor : bgSideBar, color: fgColor }}>
      <header className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Theming DevTools</h1>
          <h2 className="text-xl" style={{ fontFamily: fontFamily }}>
            {themeName ? `Theme: ${themeName} - ` : ''}
            Dark theme: {isDark ? "yes" : "no" }
          </h2>

          <Tabs 
            groups={groups} 
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup} />

          <Themes
            themes={themes}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme} />
        </div>
      </header>
    </div>
  );
};
