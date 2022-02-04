import * as React from 'react';

export interface IPropertyColorProps {
  property: string;
  value: string;
  cssVariable: string;
  codeNotition: string;
  isSecondary?: boolean;
}

export const PropertyColor: React.FunctionComponent<IPropertyColorProps> = ({ value, cssVariable, codeNotition, isSecondary }: React.PropsWithChildren<IPropertyColorProps>) => {
  return (
    <div className={`${isSecondary ? 'bg-gray-50' : ''}`}>
      <div className={`flex flex-col justify-center my-2 rounded-lg shadow ${isSecondary ? 'ml-2' : 'mr-2'}`}>
        <div className="h-16 w-full rounded-t-lg" style={{ backgroundColor: value }}></div>

        <div className="bg-white w-full text-right p-2 text-lg">{value}</div>

        <div className="bg-gray-100 w-full p-2">
          <p>CSS: {cssVariable}</p>
          <p className={`font-semibold`}>Theme: {codeNotition}</p>
        </div>
      </div>
    </div>
  );
};