// styles.ts
import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 350px;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: #333;
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
  margin-top: 20px;
`;

export const ChatWindowContainer = styled.div`
  margin-top: 20px;
`;

export const ScreenshotListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ScreenshotListItem = styled.li`
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  background-color: #ecf0f1;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d5dbdb;
  }
`;

export const ScreenshotImage = styled.img`
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
`;

export const ChatMessage = styled.div`
  margin-bottom: 10px;
`;

export const ChatTimestamp = styled.small`
  color: #7f8c8d;
  font-size: 0.8em;
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