import { readFileSync } from "fs";
import { join } from "path";
import { commands, ExtensionContext, ExtensionMode, Uri, ViewColumn, Webview, window, extensions, workspace } from "vscode";
import { Theme } from "./models/Theme";
import { parse } from "jsonc-parser";

const extensionName = `theming-devtools`;
const webviewTitle = `Theme DevTools`;

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
    commands.registerCommand(`${extensionName}.open`, () => {
      // Create and show a new webview
      const panel = window.createWebviewPanel(
        `${extensionName}.webview`,
        webviewTitle,
        ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true
        }
      );

      panel.iconPath = Uri.file(join(context.extensionPath, 'assets', 'icon.png'));

			panel.webview.html = getWebviewContent(panel.webview, context.extensionUri, context.extensionMode === ExtensionMode.Development);

      panel.webview.onDidReceiveMessage((e) => {
        if (e.command === 'vscode-init') {
          const themes = getAllThemes();
          panel.webview.postMessage({ command: 'webview-themes', payload: themes });
        } else if (e.command === 'vscode-get-theme') {
          const theme = getTheme(e.data);
          panel.webview.postMessage({ command: 'webview-theme', payload: theme });
        }
      });
    })
  );


  console.log(`${extensionName} is now active!`);

  if (context.extensionMode === ExtensionMode.Development) {
    commands.executeCommand(`${extensionName}.open`);
  }
}

function getAllThemes() {
  // Get all the theme extensions
  return extensions.all.filter(e => {
    const pkg = e.packageJSON;
    return pkg.contributes && pkg.contributes.themes && pkg.contributes.themes.length > 0;
  }).reduce((prev: string[], current: any) => {
    const pkg = current.packageJSON;
    const themes = pkg.contributes.themes;
    return [...prev, ...themes.map((theme: Theme) => theme.label)];
  }, []);
}

function getTheme(crntTheme: string) {
  // Get all the theme extensions
  const allExts = extensions.all.filter(e => {
    const pkg = e.packageJSON;
    return pkg.contributes && pkg.contributes.themes && pkg.contributes.themes.length > 0;
  });

  // Get the theme extension that matches the active theme
  const themeExtension = allExts.find(e => {
    const pkg = e.packageJSON;
    return pkg.contributes.themes.find((theme: Theme) => theme.label === crntTheme);
  });

  if (!themeExtension) {
    return;
  }

  // Get the theme file
  const themeFile: Theme = themeExtension.packageJSON.contributes.themes.find((theme: Theme) => theme.label === crntTheme);
  const fileContents = readFileSync(join(themeExtension.extensionPath, themeFile.path), 'utf8');

  if (!fileContents) {
    return;
  }

  const themeContents = parse(fileContents);
  if (!themeContents) {
    return;
  }

  if (themeContents.include) {
    try {
      const fileToInclude = readFileSync(join(themeExtension.extensionPath, 'themes' ,themeContents.include), 'utf8');
      if (fileToInclude) {
        const includeContents = parse(fileToInclude);
        return includeContents;
      }
    } catch (e) {
      window.showErrorMessage(`${webviewTitle}: Failed to load the selected theme.`);
      return;
    }
  }

  return themeContents;
}

function getWebviewContent(webview: Webview, extensionUri: Uri, isDevelopment: boolean) {
	let jsFile: any = webview.asWebviewUri(Uri.joinPath(extensionUri, ...["dist", "webview.js"]));

  if (isDevelopment) {
    jsFile = `http://localhost:9000/webview.js`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${webviewTitle}</title>
</head>
<body>
  <div id="root"></div>
  <script src="${jsFile}"></script>
</body>
</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
