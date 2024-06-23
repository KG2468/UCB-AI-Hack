import React, { useState } from 'react';
import { ChatMessage } from './types'; // Import the ChatMessage type

interface ChatWindowProps {
  chatMessages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

// Updated ChatWindow component to send message on Enter key press

const ChatWindow: React.FC<ChatWindowProps> = ({ chatMessages, onSendMessage }) => {
  const [message, setMessage] = useState('');

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
    <div>
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress} // Added key press listener
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;