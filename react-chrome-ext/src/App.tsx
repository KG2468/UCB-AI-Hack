// App.tsx
import React, { useState, useEffect } from 'react';
import ScreenshotList from './ScreenshotList';
import ScreenshotDisplay from './ScreenshotDisplay';
import { Screenshot } from './types';
import ChatWindow from './ChatWindow';
import { ChatMessage } from './types';
import { AppContainer, Title, ButtonGroup, Button, StatusText, ScreenshotListContainer, ChatWindowContainer } from './styles';

const App: React.FC = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [autoCapture, setAutoCapture] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    loadScreenshots();
  }, []);

  useEffect(() => {
    if (autoCapture) {
      const id = window.setInterval(captureScreenshot, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        window.clearInterval(intervalId);
        setIntervalId(null);
      }
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
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
        setScreenshots((prevScreenshots) => {
          let updatedScreenshots = [...prevScreenshots, newScreenshot].slice(-5);
          chrome.storage.local.set({ screenshots: updatedScreenshots });
          return updatedScreenshots;
        });
      });
    });
  };

  const clearScreenshots = () => {
    chrome.storage.local.set({ screenshots: [] }, () => {
      setScreenshots([]);
    });
  };

  return (
    <AppContainer>
      <Title>CADvisor</Title>
      <ButtonGroup>
        <Button onClick={captureScreenshot}>Capture Screenshot</Button>
        <Button onClick={() => setAutoCapture(!autoCapture)}>
          {autoCapture ? 'Stop Auto Capture' : 'Start Auto Capture'}
        </Button>
        <Button onClick={clearScreenshots}>Clear Screenshots</Button>
      </ButtonGroup>
      <StatusText>Auto Capture: {autoCapture ? 'On' : 'Off'}</StatusText>
      <ScreenshotListContainer>
        <ScreenshotList
          screenshots={screenshots}
          onSelectScreenshot={setSelectedScreenshot}
        />
      </ScreenshotListContainer>
      <ScreenshotDisplay screenshot={selectedScreenshot} />
      <ChatWindowContainer>
        <ChatWindow chatMessages={chatMessages} onSendMessage={(msg) => setChatMessages([...chatMessages, msg])} />
      </ChatWindowContainer>
    </AppContainer>
  );
};

export default App;