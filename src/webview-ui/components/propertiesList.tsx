import * as React from 'react';
import { useMemo } from 'react';
import { CodeTheme } from '../../models/CodeTheme';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';
import { useCodeTheme } from '../providers/codeThemeProvider';
import { PropertiesBlock } from './propertiesBlock';

export interface IPropertiesListProps {
  properties: VSCodeStyleProperty[];
}

export const PropertiesList: React.FunctionComponent<IPropertiesListProps> = ({ properties }: React.PropsWithChildren<IPropertiesListProps>) => {
  const { name, theme } = useCodeTheme();

  const fonts = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("font")), [properties]);
  const colors = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("foreground")), [properties]);
  const backgrounds = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("background")), [properties]);
  const borders = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("border")), [properties]);

  return (
    <div className={`text-black`}>
      <div className={`grid grid-cols-2`}>
        <h2 className={`text-xl mb-4`}>Showing properties from <strong>{properties[0].parent}</strong></h2>
        {
          (name && theme) && (
            <h2 className={`text-xl mb-4`}>Compare with: {name}</h2>
          )
        }
      </div>

      <PropertiesBlock properties={fonts} title="Font styles" />

      <PropertiesBlock properties={colors} title="Text colors" />

      <PropertiesBlock properties={backgrounds} title="Background colors" />

      <PropertiesBlock properties={borders} title="Border colors" />
    </div>
  );
};