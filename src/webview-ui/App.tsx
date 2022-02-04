import { useEffect, useMemo, useState } from "react";
import { CodeTheme } from "../models/CodeTheme";
import "./App.css";
import { Header } from "./components/header";
import { Main } from "./components/main";
import useVSCodeStyles from "./hooks/useVSCodeStyles";
import useWebviewMessage from "./hooks/useWebviewMessage";
import { CodeThemeProvider } from "./providers/codeThemeProvider";
import { StyleProvider } from "./providers/styleProvider";

function App() {
  const { isDark, themeName, styles } = useVSCodeStyles();
  const { message, sendMessage } = useWebviewMessage();
  const [ selectedGroup, setSelectedGroup ] = useState<string | null>(null);
  const [ selectedTheme, setSelectedTheme ] = useState<string | null>(null);
  const [ themes, setThemes ] = useState<any[]>([]);
  const [ themeInfo, setThemeInfo ] = useState<CodeTheme | null>(null);

  const groups = useMemo(() => [...new Set((styles || []).map(p => p.parent))].sort(), [styles]);

  useEffect(() => {
    if (message?.command === 'webview-themes') {
      setThemes(message.payload);
    } else if (message?.command === 'webview-theme') {
      setThemeInfo(message.payload);
    }
  }, [message, setThemes]);

  useEffect(() => {
    if (selectedTheme) {
      sendMessage('vscode-get-theme', selectedTheme);
    }
  }, [selectedTheme]);

  useEffect(() => {
    sendMessage('vscode-init');
  }, []);

  return (
    <StyleProvider styles={styles} themes={themes}>
      <CodeThemeProvider name={selectedTheme || undefined} theme={themeInfo || undefined}>
        <main className={`h-full w-full flex flex-col text-black`}>
          <Header 
            isDark={!!isDark}
            themeName={themeName}
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme} />

          <Main 
            selectedGroup={selectedGroup}
            styles={styles} />
        </main>
      </CodeThemeProvider>
    </StyleProvider>
  );
}

export default App;
