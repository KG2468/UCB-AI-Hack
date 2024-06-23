// App.tsx
import React, { useState, useEffect } from 'react';
import ScreenshotList from './ScreenshotList';
import { askQuestion } from './chatbot';
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
  const [isWaitingForAI, setIsWaitingForAI] = useState(true);
  let [error, setError] = useState<string | null>("");
  

  useEffect(() => {
    loadScreenshots();
  }, []);

  useEffect(() => {
    if (autoCapture) {
      // chrome.alarms.create("Screenshot", {when: Date.now()+12000});
      // chrome.alarms.onAlarm.addListener(captureScreenshot);
      // setIntervalId(1);
      const id = window.setInterval(captureScreenshot, 12000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        window.clearInterval(intervalId);
        // chrome.alarms.clear("Screenshot");
        setIntervalId(null);
      }
    }
    return () => {
    };
  }, [autoCapture]);

  useEffect(() => {
    if (screenshots.length == 5) {
      setIsWaitingForAI(false);
    }
  }), [screenshots];

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

  const handleSendMessage = async (msg: ChatMessage) =>  {
    console.log(msg.message);
    setChatMessages(prevMessages => [...prevMessages, msg]);
    setIsWaitingForAI(true);
    
    // Add AI response
    const aiAnswer = await askQuestion("A basic car model", msg.message, screenshots.map(screenshot => screenshot.url));
    const aiMessage: ChatMessage = {
      message: aiAnswer,
      timestamp: new Date().toISOString(),
      isUser: false
    };
    // setTimeout(() => {
      setChatMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsWaitingForAI(false);
    // }, 1000); // Increased delay to 1 second to make the effect more noticeable
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
        <ChatWindow 
          chatMessages={chatMessages} 
          onSendMessage={handleSendMessage}
          isWaitingForAI={isWaitingForAI}
        />
      </ChatWindowContainer>
    </AppContainer>
  );
};

export default App;