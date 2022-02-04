import { useMemo, useState } from "react";
import "./App.css";
import { Header } from "./components/header";
import { Main } from "./components/main";
import useVSCodeStyles from "./hooks/useVSCodeStyles";
import { StyleProvider } from "./providers/styleProvider";

function App() {
  const { isDark, themeName, styles } = useVSCodeStyles();
  const [ selectedGroup, setSelectedGroup ] = useState<string | null>(null);

  const groups = useMemo(() => [...new Set((styles || []).map(p => p.parent))], [styles]);

  return (
    <StyleProvider styles={styles}>
      <main className={`h-full w-full flex flex-col text-black`}>
        <Header 
          isDark={!!isDark}
          themeName={themeName}
          groups={groups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup} />

        <Main 
          selectedGroup={selectedGroup}
          styles={styles} />
      </main>
    </StyleProvider>
  );
}

export default App;
