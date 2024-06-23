import React, { useState, useEffect } from 'react';
import ScreenshotList from './ScreenshotList';
import ScreenshotDisplay from './ScreenshotDisplay';
import { Screenshot } from './types';
import ChatWindow from './ChatWindow';
import { ChatMessage } from './types'; // Assuming you have a types file or add this type there

const App: React.FC = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    loadScreenshots();
  }, []);

  const loadScreenshots = () => {
    chrome.storage.local.get({ screenshots: [] }, (result) => {
      setScreenshots(result.screenshots);
    });
  };

  const captureScreenshot = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, { format: 'png' }, (dataUrl) => {
        const newScreenshot: Screenshot = {
          url: dataUrl,
          date: new Date().toISOString(),
        };
        const updatedScreenshots = [...screenshots, newScreenshot];
        chrome.storage.local.set({ screenshots: updatedScreenshots }, () => {
          setScreenshots(updatedScreenshots);
        });
      });
    });
  };
  const autoScreenshot = async () => {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      captureScreenshot();
    }
  }

  return (
    <div style={{ width: '300px', padding: '10px' }}>
      <h1>Screenshot Saver</h1>
      <button onClick={captureScreenshot}>Capture Screenshot</button>

      <ScreenshotList
        screenshots={screenshots}
        onSelectScreenshot={setSelectedScreenshot}
      />
      <ScreenshotDisplay screenshot={selectedScreenshot} />
      <ChatWindow chatMessages={chatMessages} onSendMessage={(msg) => setChatMessages([...chatMessages, msg])} />
    </div>
  );
};

export default App;