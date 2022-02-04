export interface CodeTheme {
  name: string;
  tokenColors: TokenColor[];
  colors: Colors;
  semanticHighlighting: boolean;
}

export interface Colors {
  [key: string]: string;
}

export interface TokenColor {
  settings: Settings;
  scope?: string[] | string;
  name?: string;
}

export interface Settings {
  foreground?: string;
  fontStyle?: string;
}