// styles.ts
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }
`;

export const AppContainer = styled.div`
  width: 400px;
  height: 600px;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
<<<<<<< HEAD
  background-color: #f5f5f5;
  color: #333;
=======
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
>>>>>>> main
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 32px; // Increased from 24px
  font-weight: 700; // Bolder font weight
  margin-bottom: 20px;
  color: ${props => props.theme.text};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.button<{ isDelete?: boolean }>`
  background-color: ${props => props.isDelete ? props.theme.deleteButtonBackground : props.theme.buttonBackground};
  color: ${props => props.isDelete ? props.theme.deleteButtonText : props.theme.buttonText};
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => 
      props.isDelete 
        ? props.theme.deleteButtonHover 
        : props.theme.activeTabBackground
    };
  }
`;

export const StatusText = styled.p`
  font-size: 14px;
  margin: 10px 0;
  color: ${props => props.theme.secondaryText};
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
<<<<<<< HEAD
  background-color: #ecf0f1;
=======
  background-color: ${props => props.theme.grayMessage};
  color: ${props => props.theme.grayMessageText};
>>>>>>> main
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
<<<<<<< HEAD
    background-color: #d5dbdb;
=======
    background-color: ${props => props.theme.grayMessage === '#ecf0f1' ? '#d5dbdb' : '#3a3a4e'};
>>>>>>> main
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
<<<<<<< HEAD
  color: #34495e;
=======
  color: ${props => props.theme.secondaryText};
>>>>>>> main
`;

export const ScreenshotDropdown = styled.div<{ expanded: boolean }>`
  max-height: ${props => props.expanded ? '300px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

export const ScreenshotImage = styled.img`
  max-width: 100%;
  border-radius: 5px;
<<<<<<< HEAD
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
=======
  box-shadow: 0 2px 4px ${props => props.theme.shadowColor};
>>>>>>> main
  margin-top: 10px;
`;

export const ChatWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  border: 1px solid ${props => props.theme.borderColor};
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
  color: ${props => props.theme.secondaryText};
  margin-bottom: 2px;
`;

export const ChatBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${props => props.isUser ? props.theme.chatBubbleUser : props.theme.chatBubbleAI};
  color: ${props => props.isUser ? 'white' : props.theme.grayMessageText};
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
  border-top: 1px solid ${props => props.theme.borderColor};
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 3px;
  margin-right: 5px;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
`;

export const SendButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonText};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
`;

