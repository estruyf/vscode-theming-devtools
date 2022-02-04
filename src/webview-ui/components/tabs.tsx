import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { useStyles } from '../providers/styleProvider';

export interface ITabsProps {
  groups: string[];
  selectedGroup: string | null;
  setSelectedGroup: (group: string) => void;
}

export const Tabs: React.FunctionComponent<ITabsProps> = ({ groups, selectedGroup, setSelectedGroup }: React.PropsWithChildren<ITabsProps>) => {
  const styles = useStyles();
  
  const fgColor = useMemo(() => styles.find(({ property }) => property === "foreground")?.value, [styles]);
  const linkColor = useMemo(() => styles.find(({ property }) => property === "textLinkForeground")?.value, [styles]);

  useEffect(() => {
    if (groups.length > 0 && selectedGroup === null) {
      setSelectedGroup(groups[1]);
    }
  }, [groups, selectedGroup, setSelectedGroup]);

  return (
    <nav className="mt-4" aria-label="Tabs">
      {
        groups.map((group) => (
          <button
            key={group}
            className={`${group === selectedGroup ? "text-white" : "text-gray-500 hover:text-gray-300"} mr-2 mb-2 first-letter:uppercase font-medium text-sm rounded-md`}
            style={{
              color: group === selectedGroup ? fgColor : linkColor,
            }}
            onClick={() => setSelectedGroup(group)}
          >
            {group}
          </button>
        ))
      }
    </nav>
  );
};