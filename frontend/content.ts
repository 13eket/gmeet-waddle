import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  //matches: ["https://www.meet.google.com/*"],
  matches: ["<all_urls>"],
  all_frames: true
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getDOM") {
    const dom = document.documentElement.innerHTML;
    sendResponse({dom: dom});
    //console.log(dom)
    return true
  }
});
