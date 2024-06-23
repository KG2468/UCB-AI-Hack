// App.tsx
import React, { useState, useEffect } from 'react';
import ScreenshotList from './ScreenshotList';
import { askQuestion, askQuestionTemp } from './chatbot';
import ScreenshotDisplay from './ScreenshotDisplay';
import { Screenshot } from './types';
import ChatWindow from './ChatWindow';
import { ChatMessage } from './types';
import { AppContainer, Title, ButtonGroup, Button, StatusText, ScreenshotListContainer, ChatWindowContainer } from './styles';
import { Tabs, Tab, TabPanel } from './TabComponents';
import InitialQuestion from './InitialQuestion';


const App: React.FC = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [autoCapture, setAutoCapture] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isWaitingForAI, setIsWaitingForAI] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [projectDescription, setProjectDescription] = useState<string | null>(null);
  

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

    if (selectedIndex !== null && screenshots.length > selectedIndex) {
      setSelectedScreenshot(screenshots[selectedIndex]);
    }
  }, [screenshots, selectedIndex]);

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
      setSelectedScreenshot(null);
      setSelectedIndex(null);
    });
  };


  const handleSelectScreenshot = (screenshot: Screenshot, index: number) => {
    setSelectedScreenshot(screenshot);
    setSelectedIndex(index);
  };

  const handleSendMessage = async (msg: ChatMessage) => {
    setChatMessages(prevMessages => [...prevMessages, msg]);
    setIsWaitingForAI(true);
    
    // Add AI response
    const aiAnswer = await askQuestionTemp("A basic car model", msg.message, screenshots.map(screenshot => screenshot.url));
    const aiMessage: ChatMessage = {
      message: aiAnswer,
      timestamp: new Date().toISOString(),
      isUser: false
    };
    setTimeout(() => {
      setChatMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsWaitingForAI(false);
    }, 1000);
  };

  const handleProjectDescription = (description: string) => {
    setProjectDescription(description);
    // You might want to send this description to your AI or store it for later use
    const systemMessage: ChatMessage = {
      message: `Project description: ${description}`,
      timestamp: new Date().toISOString(),
      isUser: false
    };
    setChatMessages([systemMessage]);
  };

  return (
    <AppContainer>
      <Title>CADvisor</Title>
      <ButtonGroup>
        <Button onClick={captureScreenshot}>Capture Screenshot</Button>
        {/* <Button onClick={() => setAutoCapture(!autoCapture)}>
          {autoCapture ? 'Stop Auto Capture' : 'Start Auto Capture'}
        </Button> */}
        <Button onClick={clearScreenshots}>Clear Screenshots</Button>
      </ButtonGroup>
      {/* <StatusText>Auto Capture: {autoCapture ? 'On' : 'Off'}</StatusText> */}
      
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        <Tab>Screenshots</Tab>
        <Tab>Chat</Tab>
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        <ScreenshotListContainer>
          <ScreenshotList
            screenshots={screenshots}
            onSelectScreenshot={handleSelectScreenshot}
          />
        </ScreenshotListContainer>
        {/* Remove the ScreenshotDisplay component from here */}
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <ChatWindowContainer>
          {projectDescription === null ? (
            <InitialQuestion onSubmit={handleProjectDescription} />
          ) : (
            <ChatWindow 
              chatMessages={chatMessages} 
              onSendMessage={handleSendMessage}
              isWaitingForAI={isWaitingForAI}
            />
          )}
        </ChatWindowContainer>
      </TabPanel>
    </AppContainer>
  );
};

export default App;