// styles.ts
import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 400px;
  height: 600px;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

export const StatusText = styled.p`
  font-size: 14px;
  margin: 10px 0;
  color: #7f8c8d;
`;

export const ScreenshotListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
`;

export const ChatWindowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ScreenshotListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ScreenshotListItem = styled.li`
  cursor: pointer;
  padding: 15px;
  margin: 10px 0;
  background-color: #ecf0f1;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #d5dbdb;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const ScreenshotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ScreenshotDate = styled.span`
  font-size: 0.9em;
  color: #34495e;
`;

export const ScreenshotDropdown = styled.div<{ expanded: boolean }>`
  max-height: ${props => props.expanded ? '300px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

export const ScreenshotImage = styled.img`
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

export const ChatWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
`;


export const ChatMessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const MessageGroup = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

export const MessageLabel = styled.div`
  font-size: 0.8em;
  color: #555;
  margin-bottom: 2px;
`;

export const ChatBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${props => props.isUser ? '#007AFF' : '#E9E9EB'};
  color: ${props => props.isUser ? 'white' : 'black'};
  word-wrap: break-word;
`;

export const ChatBubbleContent = styled.p`
  margin: 0;
  padding: 0;
  text-align: left;
`;

export const ChatTimestamp = styled.small`
  display: block;
  font-size: 0.7em;
  margin-top: 5px;
  text-align: right;
  opacity: 0.7;
`;


export const ChatInputWrapper = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #bdc3c7;
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  margin-right: 5px;
`;

export const SendButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

