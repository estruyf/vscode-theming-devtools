import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { VSCodeStyleProperty } from '../hooks/useVSCodeStyles';
import { useCodeTheme } from '../providers/codeThemeProvider';
import { PropertiesBlock } from './propertiesBlock';

export interface IPropertiesListProps {
  properties: VSCodeStyleProperty[];
}

export const PropertiesList: React.FunctionComponent<IPropertiesListProps> = ({ properties }: React.PropsWithChildren<IPropertiesListProps>) => {
  const { name, theme } = useCodeTheme();
  const [ filter, setFilter ] = useState<string>("");

  let fonts = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("font")).sort(), [properties]);
  let colors = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("foreground")).sort(), [properties]);
  let backgrounds = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("background")).sort(), [properties]);
  let borders = useMemo(() => properties.filter(({ property }) => property.toLowerCase().includes("border") && (!filter || property.includes(filter))).sort(), [properties]);

  const filterProperties = useCallback(({ property, cssVariable, codeNotition }: VSCodeStyleProperty) => property.toLowerCase().includes(filter.toLowerCase()) || cssVariable.toLowerCase().includes(filter.toLowerCase()) || codeNotition.toLowerCase().includes(filter.toLowerCase()), [filter]);

  if (filter) {
    fonts = fonts.filter(filterProperties);
    colors = colors.filter(filterProperties);
    backgrounds = backgrounds.filter(filterProperties);
    borders = borders.filter(filterProperties);
  }

  return (
    <div className={`text-black`}>
      <div className={`grid grid-cols-2`}>
        <h2 className={`text-2xl mb-4`}>Showing properties from <strong>{properties[0].parent}</strong></h2>
        {
          (name && theme) && (
            <h2 className={`text-2xl mb-4`}>Compare with: <strong>{name}</strong></h2>
          )
        }
      </div>

      <div className="my-4 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Filter
        </label>
        <input
          type="text"
          name="filterValue"
          id="filterValue"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm focus:outline-none"
          placeholder="Example: foreground"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <PropertiesBlock properties={fonts} title="Font styles" />

      <PropertiesBlock properties={colors} title="Text colors" />

      <PropertiesBlock properties={backgrounds} title="Background colors" />

      <PropertiesBlock properties={borders} title="Border colors" />
    </div>
  );
};