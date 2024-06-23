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
  const [autoCapture, setAutoCapture] = useState(false);
  let [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    loadScreenshots();
  }, []);

  useEffect(() => {
    if (autoCapture) {
      let temp = window.setInterval(() => {
        captureScreenshot();
      }, 1000)
      setIntervalId(temp); // Adjust time as needed
    } else {
      window.clearInterval(intervalId);
    }
    return () => {
      setIntervalId(0);
    };
  }, [autoCapture]);

  const loadScreenshots = () => {
    chrome.storage.local.get({ screenshots: [] }, (result) => {
      setScreenshots(result.screenshots);
    });
  };

  const captureScreenshot = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, { format: 'png' }, (dataUrl) => {
        const newScreenshot: Screenshot = {
          url: dataUrl,
          date: new Date().toISOString(),
        };
        // Use functional update to ensure we have the latest state
        setScreenshots((prevScreenshots) => {
          let updatedScreenshots = [...prevScreenshots, newScreenshot];
          // Ensure only the last 5 screenshots are kept
          if (updatedScreenshots.length > 5) {
            updatedScreenshots = updatedScreenshots.slice(-5);
          }
          chrome.storage.local.set({ screenshots: updatedScreenshots }, () => {
            // This callback doesn't need to update state again
          });
          return updatedScreenshots;
        });
      });
    });
  };
  
  const clearScreenshots = () => {
    chrome.storage.local.set({ screenshots: [] }, () => {
      setScreenshots([]);
    });
  }
  // const autoScreenshot = async () => {
  //   while (true && autoCapture) {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     captureScreenshot();
  //   }
  // };

  // const stopCapture = () => {
  //   ;
  //   setDidThisShitRun(true);
  // };

  return (
    <div style={{ width: '300px', padding: '10px' }}>
      <h1>Screenshot Saver</h1>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
      <button onClick={() =>setAutoCapture(true)}>Auto Capture Screenshot</button>
      <button onClick={() =>setAutoCapture(false)}>Stop Capture Screenshot</button>
      <button onClick={clearScreenshots}>Clear Screenshots</button>
      <p>{autoCapture.toString()}</p> {/* Displaying the value of autoCapture */}
      <p>{intervalId}</p>
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