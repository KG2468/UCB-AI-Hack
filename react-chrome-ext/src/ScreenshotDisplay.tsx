import React from 'react';
import { Screenshot } from './types';

interface Props {
  screenshot: Screenshot | null;
}

const ScreenshotDisplay: React.FC<Props> = ({ screenshot }) => {
  if (!screenshot) return null;

  return (
    <img src={screenshot.url} alt="Captured screenshot" style={{ maxWidth: '100%', marginTop: '10px' }} />
  );
};

export default ScreenshotDisplay;