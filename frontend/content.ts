import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://meet.google.com/*"],
  all_frames: true
}

let observer: MutationObserver | undefined;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === 'startObserving') {
    // Unique div class for google CC
    const targetNode = document.querySelector('div.a4cQT');
    
    if (targetNode && !observer) {
      observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          console.log(mutation);
        });
      });
      
      const observerConfig = { attributes: true, childList: true, subtree: true };
      observer.observe(targetNode, observerConfig);
      sendResponse({ message: 'STARTED OBSERVING!' });
    }
  } else if (message.message === 'stopObserving') {
    if (observer) {
      observer.disconnect();
      observer = undefined;
      sendResponse({ message: 'STOPPED OBSERVING!' });
    }
  }
  
  return true;
});
