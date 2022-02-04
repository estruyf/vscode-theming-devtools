import * as React from 'react';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';

export interface IPropertyItemProps {
  property: VSCodeStyleProperty;
}

export const PropertyItem: React.FunctionComponent<IPropertyItemProps> = ({ property: { property, value, cssVariable }}: React.PropsWithChildren<IPropertyItemProps>) => {

  if (value.startsWith("#") || value.startsWith("rgb")) {
    return (
      <div className={`flex flex-col space-y-2 pt-2`}>
        <div><strong>CSS Variable</strong>: {cssVariable}</div>
        <div className={`flex items-center`}><strong>Value</strong>: <div className="inline-block h-5 w-5 m-2 border border-black" style={{ backgroundColor: value }}></div> {value}</div>
      </div>
    )
  }
  
  return (
    <div className={`flex flex-col space-y-2 pt-2`} style={{ fontFamily: property.toLowerCase().includes("fontfamily") ? value : "inherit" }}>
      <span><strong>CSS Variable</strong>: {cssVariable}</span>
      <span><strong>Value</strong>: {value}</span>
    </div>
  );
};