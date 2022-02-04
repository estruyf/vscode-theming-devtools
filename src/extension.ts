import { commands, ExtensionContext, ExtensionMode, Uri, ViewColumn, Webview, window } from "vscode";

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
        }
      );

			panel.webview.html = getWebviewContent(panel.webview, context.extensionUri, context.extensionMode === ExtensionMode.Development);
    })
  );
  console.log(`${extensionName} is now active!`);

  setTimeout(() => {
    console.log(`${extensionName} opening webview!`);
    if (context.extensionMode === ExtensionMode.Development) {
      commands.executeCommand(`${extensionName}.open`);
    }
  }, 1000);
}

function getWebviewContent(webview: Webview, extensionUri: Uri, isDevelopment: boolean) {

	let jsFile: any = webview.asWebviewUri(Uri.joinPath(extensionUri, ...["webview-out", "assets", "index.js"]));

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
