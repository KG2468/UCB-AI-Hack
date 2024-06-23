// ChatWindow.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './types';
import {
  ChatWindowWrapper,
  ChatMessageList,
  ChatMessage as StyledChatMessage,
  ChatTimestamp,
  ChatInputWrapper,
  ChatInput,
  SendButton
} from './styles';

interface ChatWindowProps {
  chatMessages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatMessages, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage({ message, timestamp: new Date().toISOString() });
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <ChatWindowWrapper>
      <ChatMessageList>
        {chatMessages.map((msg, index) => (
          <StyledChatMessage key={index}>
            <ChatTimestamp>{new Date(msg.timestamp).toLocaleString()}</ChatTimestamp>
            <p>{msg.message}</p>
          </StyledChatMessage>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessageList>
      <ChatInputWrapper>
        <ChatInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </ChatInputWrapper>
    </ChatWindowWrapper>
  );
};

export default ChatWindow;