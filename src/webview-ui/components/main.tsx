import * as React from 'react';
import { useMemo } from 'react';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';
import { PropertiesList } from './propertiesList';

export interface IMainProps {
  selectedGroup: string | null;
  styles: VSCodeStyleProperty[];
}

export const Main: React.FunctionComponent<IMainProps> = ({styles, selectedGroup}: React.PropsWithChildren<IMainProps>) => {

  if (!styles || !selectedGroup) {
    return null;
  }

  const properties = useMemo(() => styles.filter(({ parent }) => parent === selectedGroup), [styles, selectedGroup]);

  return (
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="rounded-lg" style={{ minHeight: "250px" }}>
            <PropertiesList properties={properties} />
          </div>
        </div>
      </div>
    </main>
  );
};