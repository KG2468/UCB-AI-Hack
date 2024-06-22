// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
    // Capture the visible tab
    chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
      // Save the screenshot
      chrome.storage.local.get({screenshots: []}, (result) => {
        let screenshots = result.screenshots;
        screenshots.push({
          url: dataUrl,
          date: new Date().toISOString()
        });
        chrome.storage.local.set({screenshots: screenshots}, () => {
          console.log('Screenshot saved');
        });
      });
    });
  });