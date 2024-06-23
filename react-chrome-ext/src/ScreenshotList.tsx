// ScreenshotList.tsx
import React from 'react';
import { Screenshot } from './types';

interface Props {
  screenshots: Screenshot[];
  onSelectScreenshot: (screenshot: Screenshot, index: number) => void;
}

const ScreenshotList: React.FC<Props> = ({ screenshots, onSelectScreenshot }) => {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {screenshots.map((screenshot, index) => (
        <li
          key={index}
          onClick={() => onSelectScreenshot(screenshot, index)}
          style={{ cursor: 'pointer', padding: '5px', margin: '5px 0', backgroundColor: '#f0f0f0', borderRadius: '3px' }}
        >
          Screenshot {index + 1} - {new Date(screenshot.date).toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default ScreenshotList;