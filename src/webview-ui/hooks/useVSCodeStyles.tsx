import { useState, useEffect } from 'react';

export default function useVSCodeStyles() {
  const [themeName, setThemeName] = useState<string | null>();
  const [isDark, setIsDark] = useState<boolean | null>();
  const [styles, setStyles] = useState<VSCodeStyleProperty[]>([]);

  const getCamelCaseArray = (camel: string) => {
    var reg = /([a-z0-9])([A-Z])/g;
    return camel.replace(reg, '$1 $2').split(' ');
  }

  /**
   * Convert style string to object
   * @param str 
   * @returns 
   */
  const toStyleObject = (str: string) => {
    const data = str.split(':');
    let property = data[0];
    const cssVariable = property;
    const value = data[1];

    const propertySplit = property.replace('--vscode-', '').split('-');
    const codeNotition = propertySplit.join('.')
    const parent = getCamelCaseArray(propertySplit[0])[0];

    property = propertySplit.map((valuePart, idx) => {
      if (idx === 0) {
        return valuePart;
      }

      return `${valuePart.charAt(0).toUpperCase()}${valuePart.slice(1)}`;
    }).join('');

    return {
      property,
      value,
      parent,
      cssVariable,
      codeNotition
    };
  };

  /**
   * Get the VSCode styles from the theme
   * @param elm 
   * @returns 
   */
   const updateThemeValues = (elm: HTMLElement) => {
    if (!elm) {
      return;
    }

    // Check if a dark theme is used
    const darkMode = elm.classList.contains('vscode-dark');
    setIsDark(darkMode);

    // Update the theme name
    const crntThemeName = elm.getAttribute(`data-vscode-theme-name`);
    setThemeName(crntThemeName);

    // Get all styles
    const htmlStyle = document.querySelector('html')?.getAttribute('style');
    if (!htmlStyle) {
      return;
    }

    const vscodeStyles = htmlStyle.split(';').map(x => x.trim()).filter(s => s.startsWith('--vscode-')).map(s => toStyleObject(s));

    setStyles(vscodeStyles);
  };

  useEffect(() => {
    const mutationObserver = new MutationObserver((mutationsList, observer) => {
      const last = mutationsList.filter(item => item.type === "attributes" || item.attributeName === 'class').pop();
      updateThemeValues(last?.target as HTMLElement);
    });

    updateThemeValues(document.body);

    mutationObserver.observe(document.body, { childList: false, attributes: true })

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return {
    isDark,
    themeName,
    styles
  };
}

export interface VSCodeStyleProperty {
  property: string;
  value: string;
  parent: string;
  cssVariable: string;
  codeNotition: string;
}