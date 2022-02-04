import { useState, useEffect } from 'react';
import { Messenger } from '@estruyf/vscode/dist/client/webview';

export default function useWebviewMessage() {
  const [message, setMessage] = useState<any>(null);

  const msgHandler = (ev: MessageEvent<any>) => {
    if (ev.data.command === 'webview-themes' || ev.data.command === 'webview-theme') {
      setMessage(ev.data);
    }
  };

  const sendMessage = (command: string, data?: any) => {
    Messenger.send(command, data);
  };

  useEffect(() => {
    window.addEventListener("message", msgHandler);

    return () => {
      window.removeEventListener("message", msgHandler);
    }
  }, []);

  return {
    message,
    sendMessage
  };
}