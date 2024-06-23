import React, { useState } from 'react';
import { Screenshot } from './types';
import {
  ScreenshotListWrapper,
  ScreenshotListItem,
  ScreenshotImage,
  ScreenshotDate,
  ScreenshotHeader,
  ScreenshotDropdown
} from './styles';

interface Props {
  screenshots: Screenshot[];
  onSelectScreenshot: (screenshot: Screenshot, index: number) => void;
}

const ScreenshotList: React.FC<Props> = ({ screenshots, onSelectScreenshot }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleClick = (screenshot: Screenshot, index: number) => {
    onSelectScreenshot(screenshot, index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScreenshotListWrapper>
      {screenshots.map((screenshot, index) => (
        <React.Fragment key={index}>
          <ScreenshotListItem onClick={() => handleClick(screenshot, index)}>
            <ScreenshotHeader>
              <ScreenshotDate>
                {new Date(screenshot.date).toLocaleString()}
              </ScreenshotDate>
            </ScreenshotHeader>
          </ScreenshotListItem>
          <ScreenshotDropdown expanded={expandedIndex === index}>
            <ScreenshotImage src={screenshot.url} alt={`Screenshot ${index + 1}`} />
          </ScreenshotDropdown>
        </React.Fragment>
      ))}
    </ScreenshotListWrapper>
  );
};

export default ScreenshotList;