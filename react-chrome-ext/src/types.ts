export interface Screenshot {
  url: string;
  date: string;
}

// Add this new type for chat messages
export interface ChatMessage {
  message: string;
  timestamp: string;
  isUser: boolean;
}


export type MessageHistory = string[];


