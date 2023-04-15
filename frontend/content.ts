import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://meet.google.com/*"],
  all_frames: true
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log(mutation);
  });
});

const targetNode = document.body;
const observerConfig = { attributes: true, childList: true, subtree: true };
observer.observe(targetNode, observerConfig);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'stop') {
    observer.disconnect();
    sendResponse({message: 'STOPPED OBSERVING!' });
    return true
  }
});
