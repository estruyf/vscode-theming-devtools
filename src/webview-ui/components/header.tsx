import * as React from 'react';
import { useMemo } from 'react';
import { useStyles } from '../providers/styleProvider';
import { Tabs } from './tabs';

export interface IHeaderProps {
  isDark: boolean;
  groups: string[];
  selectedGroup: string | null;
  setSelectedGroup: (group: string) => void;
}

export const Header: React.FunctionComponent<IHeaderProps> = ({ isDark, groups, selectedGroup, setSelectedGroup }: React.PropsWithChildren<IHeaderProps>) => {
  const styles = useStyles();

  const fgColor = useMemo(() => styles.find(({ property }) => property === "foreground")?.value, [styles]);
  const bgColor = useMemo(() => styles.find(({ property }) => property === "editorBackground")?.value, [styles]);
  const bgSideBar = useMemo(() => styles.find(({ property }) => property === "sideBarBackground")?.value, [styles]);
  const fontFamily = useMemo(() => styles.find(({ property }) => property === "editorFontFamily")?.value, [styles]);

  return (
    <div className="bg-gray-800 text-white pb-32" style={{ backgroundColor: isDark ? bgColor : bgSideBar, color: fgColor }}>
      <header className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Theming DevTools</h1>
          <h2 className="text-xl" style={{ fontFamily: fontFamily }}>Is dark theme: {isDark ? "yes" : "no" }</h2>

          <Tabs 
            groups={groups} 
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup} />
        </div>
      </header>
    </div>
  );
};
