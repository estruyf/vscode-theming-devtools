import * as React from 'react';
import { useMemo } from 'react';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';
import { PropertiesBlock } from './propertiesBlock';

export interface IPropertiesListProps {
  properties: VSCodeStyleProperty[];
}

export const PropertiesList: React.FunctionComponent<IPropertiesListProps> = ({ properties }: React.PropsWithChildren<IPropertiesListProps>) => {

  const fonts = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("font")), [properties]);
  const colors = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("foreground")), [properties]);
  const backgrounds = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("background")), [properties]);
  const borders = useMemo(() => properties.filter(({ property }) => property.startsWith("border")), [properties]);

  return (
    <div className={`text-black`}>
      <h2 className={`text-xl mb-4`}>Showing properties from <strong>{properties[0].parent}</strong></h2>

      <PropertiesBlock properties={fonts} title="Font styles" />

      <PropertiesBlock properties={colors} title="Text colors" />

      <PropertiesBlock properties={backgrounds} title="Background colors" />

      <PropertiesBlock properties={borders} title="Border colors" />

      {/* {
        properties.map((property) => (
          <PropertyItem key={property.property} property={property} />
        ))
      } */}
    </div>
  );
};