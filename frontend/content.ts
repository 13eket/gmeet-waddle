import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://meet.google.com/*"],
  all_frames: true
}

let observer: MutationObserver | undefined;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startObserving') {
    // Unique div class for google CC
    const targetNode = document.querySelector('div.a4cQT');
    
    if (targetNode && !observer) {
      observer = new MutationObserver(mutations => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.TEXT_NODE) {
                const textContent = node.textContent.trim();
                chrome.runtime.sendMessage({ message: "storeText", content: textContent }, (response) => {
                  console.log(response.message);
                });
              }
            });
          }
        });
      });
      
      const observerConfig = { attributes: true, childList: true, subtree: true };
      observer.observe(targetNode, observerConfig);
      sendResponse({ message: 'STARTED OBSERVING!' });
    }
  } else if (request.message === 'stopObserving') {
    if (observer) {
      observer.disconnect();
      observer = undefined;
      sendResponse({ message: 'STOPPED OBSERVING!' });
    }
  }
  
  return true;
});
