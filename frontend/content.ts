import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://meet.google.com/*"],
  css: ["./styles.css"],
  all_frames: true
}

let observer: MutationObserver | undefined;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startObserving') {
    // Unique div class for google CC
    const targetNode = document.querySelector('div.iOzk7');
    
    if (targetNode && !observer) {
      observer = new MutationObserver(mutations => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            const targetNode = mutation.target;
            const removedSpans = [];
            mutation.removedNodes.forEach((node) => {
              if (node.nodeName === 'SPAN')
                removedSpans.push(node.textContent.trim());
            });
            removedSpans.reverse();
            chrome.runtime.sendMessage({ message: "storeText", content: removedSpans.join(' ') }, (response) => {
              console.log(response.message);
            });
          }
        });
      });
      
      const observerConfig = { attributes: true, childList: true, subtree: true };
      observer.observe(targetNode, observerConfig);
      sendResponse({ message: 'started observing!' });
    }
  } else if (request.message === 'stopObserving') {
    if (observer) {
      observer.disconnect();
      observer = undefined;
      sendResponse({ message: 'stopped observing!' });
    }
  }
  
  return true;
});
