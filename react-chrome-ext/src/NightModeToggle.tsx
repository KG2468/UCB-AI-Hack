import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

interface NightModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const NightModeToggle: React.FC<NightModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <ToggleButton onClick={toggleDarkMode}>
      {isDarkMode ? '☀️' : '🌙'}
    </ToggleButton>
  );
};

export default NightModeToggle;