import React, { useState, useEffect } from 'react';
import ScreenshotList from './ScreenshotList';
import ScreenshotDisplay from './ScreenshotDisplay';
import { Screenshot } from './types';

const App: React.FC = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null);

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

  return (
    <div style={{ width: '300px', padding: '10px' }}>
      <h1>Screenshot Saver</h1>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
      <ScreenshotList
        screenshots={screenshots}
        onSelectScreenshot={setSelectedScreenshot}
      />
      <ScreenshotDisplay screenshot={selectedScreenshot} />
    </div>
  );
};

export default App;