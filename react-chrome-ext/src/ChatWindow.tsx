import React, { useState } from 'react';
import { ChatMessage } from './types'; // Import the ChatMessage type

interface ChatWindowProps {
  chatMessages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatMessages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage({ message, timestamp: new Date().toISOString() });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>
            <p>{msg.message}</p>
            <small>{msg.timestamp}</small>
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;