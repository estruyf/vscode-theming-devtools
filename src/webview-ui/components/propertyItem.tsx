import * as React from 'react';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';
import { useCodeTheme } from '../providers/codeThemeProvider';
import { PropertyColor } from './propertyColor';

export interface IPropertyItemProps {
  property: VSCodeStyleProperty;
}

export const PropertyItem: React.FunctionComponent<IPropertyItemProps> = ({ property: { property, value, cssVariable, codeNotition }}: React.PropsWithChildren<IPropertyItemProps>) => {
  const { name, theme } = useCodeTheme();

  const compareProperty = theme?.colors ? theme.colors[codeNotition] : undefined;

  if (value.startsWith("#") || value.startsWith("rgb")) {
    return (
      <div className={`grid grid-cols-2`}>
       <PropertyColor 
        property={property}
        value={value}
        cssVariable={cssVariable}
        codeNotition={codeNotition} />

        {
          compareProperty ? (
            <PropertyColor 
             property={property}
             value={compareProperty}
             cssVariable={cssVariable}
             codeNotition={codeNotition}
             isSecondary />
          ) : (
            name && ( <div className='bg-gray-50 block'></div> )
          )
        }
      </div>
    )
  }
  
  return (
    <div className={`flex flex-col space-y-2 py-2`} style={{ fontFamily: property.toLowerCase().includes("fontfamily") ? value : "inherit" }}>
      <span><strong>CSS Variable</strong>: {cssVariable}</span>
      <span><strong>Value</strong>: {value}</span>
    </div>
  );
};