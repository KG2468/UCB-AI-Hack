document.addEventListener('DOMContentLoaded', () => {
    const captureBtn = document.getElementById('captureBtn');
    const screenshotList = document.getElementById('screenshotList');
    const screenshotDisplay = document.getElementById('screenshotDisplay');
  
    // Function to update the screenshot list
    function updateScreenshotList() {
      chrome.storage.local.get({screenshots: []}, (result) => {
        screenshotList.innerHTML = '';
        result.screenshots.forEach((screenshot, index) => {
          const li = document.createElement('li');
          li.textContent = `Screenshot ${index + 1} - ${new Date(screenshot.date).toLocaleString()}`;
          li.addEventListener('click', () => {
            screenshotDisplay.src = screenshot.url;
          });
          screenshotList.appendChild(li);
        });
      });
    }
  
    // Capture button click event
    captureBtn.addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
          chrome.storage.local.get({screenshots: []}, (result) => {
            let screenshots = result.screenshots;
            screenshots.push({
              url: dataUrl,
              date: new Date().toISOString()
            });
            chrome.storage.local.set({screenshots: screenshots}, () => {
              console.log('Screenshot saved');
              updateScreenshotList();
            });
          });
        });
      });
    });
  
    // Initial load of screenshot list
    updateScreenshotList();
  });