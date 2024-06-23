import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
<<<<<<< HEAD
  background-color: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#f0f0f0'};
=======
  background-color: ${props => props.active ? props.theme.activeTabBackground : 'transparent'};
  color: ${props => props.active ? props.theme.activeTabText : props.theme.inactiveTabText};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${props => props.active ? props.theme.activeTabBackground : props.theme.tabHoverBackground};
>>>>>>> main
  }
`;

export const Tabs: React.FC<{ activeTab: number, onChange: (index: number) => void, children: React.ReactNode }> = ({ activeTab, onChange, children }) => (
  <TabsContainer>
    {React.Children.map(children, (child, index) => (
      React.cloneElement(child as React.ReactElement, { active: index === activeTab, onClick: () => onChange(index) })
    ))}
  </TabsContainer>
);

export const Tab: React.FC<{ active?: boolean, onClick?: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
  <TabButton active={active || false} onClick={onClick}>
    {children}
  </TabButton>
);

export const TabPanel: React.FC<{ value: number, index: number, children: React.ReactNode }> = ({ value, index, children }) => (
  <div hidden={value !== index}>
    {children}
  </div>
);