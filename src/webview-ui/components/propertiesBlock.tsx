import * as React from 'react';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';
import { PropertyItem } from './propertyItem';

export interface IPropertiesBlockProps {
  title: string;
  properties: VSCodeStyleProperty[];
}

export const PropertiesBlock: React.FunctionComponent<IPropertiesBlockProps> = ({ title, properties }: React.PropsWithChildren<IPropertiesBlockProps>) => {

  if (!properties || properties.length <= 0) { 
    return null;
  }

  return (
    <div className="mb-4">
      <h3 className={`text-lg mb-2`}>{title}</h3>
      <div className="grid grid-cols-1 gap-4 divide-y divide-gray-200">
        {properties.map((property) => (
          <PropertyItem key={property.property} property={property}/>
        ))}
      </div>
    </div>
  );
};