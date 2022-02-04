import * as React from 'react';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';
import { useCodeTheme } from '../providers/codeThemeProvider';

export interface IPropertyItemProps {
  property: VSCodeStyleProperty;
}

export const PropertyItem: React.FunctionComponent<IPropertyItemProps> = ({ property: { property, value, cssVariable, codeNotition }}: React.PropsWithChildren<IPropertyItemProps>) => {
  const { name, theme } = useCodeTheme();

  const compareProperty = theme?.colors ? theme.colors[codeNotition] : undefined;

  if (value.startsWith("#") || value.startsWith("rgb")) {
    return (
      <div className={`grid grid-cols-2 col`}>
        <div className={`flex flex-col py-2 justify-center`}>
          <div><strong>CSS Variable</strong>: {cssVariable}</div>
          <div className={`flex items-center`}><strong>Value</strong>: <div className="inline-block h-5 w-5 m-2 border border-black" style={{ backgroundColor: value }}></div> {value}</div>
        </div>

        {
          compareProperty ? (
            <div className={`flex flex-col py-2 pl-2 border-l border-gray-200 bg-gray-50`}>
              <div><strong>CSS Variable</strong>: {cssVariable}</div>
              <div className={`flex items-center`}><strong>Value</strong>: <div className="inline-block h-5 w-5 m-2 border border-black" style={{ backgroundColor: compareProperty }}></div> {compareProperty}</div>
            </div>
          ) : (
            name && ( <div className='bg-gray-50 border-l border-gray-200 block'></div> )
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