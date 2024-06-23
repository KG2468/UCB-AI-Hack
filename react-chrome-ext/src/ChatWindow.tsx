// ChatWindow.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './types';
import {
  ChatWindowWrapper,
  ChatMessageList,
  ChatBubble,
  ChatBubbleContent,
  ChatTimestamp,
  ChatInputWrapper,
  ChatInput,
  SendButton,
  MessageLabel,
  MessageGroup
} from './styles';

interface ChatWindowProps {
  chatMessages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
  isWaitingForAI: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatMessages, onSendMessage, isWaitingForAI }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const sendMessage = () => {
    if (message.trim() && !isWaitingForAI) {
      const userMessage: ChatMessage = { 
        message, 
        timestamp: new Date().toISOString(), 
        isUser: true 
      };
      onSendMessage(userMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isWaitingForAI) {
      sendMessage();
    }
  };

  return (
    <ChatWindowWrapper>
      <ChatMessageList>
        {chatMessages.map((msg, index) => (
          <MessageGroup key={index} isUser={msg.isUser}>
            <MessageLabel>
              {msg.isUser ? 'You' : 'CADvisor A.I.'}
            </MessageLabel>
            <ChatBubble isUser={msg.isUser}>
              <ChatBubbleContent>{msg.message}</ChatBubbleContent>
              <ChatTimestamp>{new Date(msg.timestamp).toLocaleString()}</ChatTimestamp>
            </ChatBubble>
          </MessageGroup>
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
          disabled={isWaitingForAI}
        />
        <SendButton onClick={sendMessage} disabled={isWaitingForAI}>
          {isWaitingForAI ? 'Waiting...' : 'Send'}
        </SendButton>
      </ChatInputWrapper>
    </ChatWindowWrapper>
  );
};

export default ChatWindow;