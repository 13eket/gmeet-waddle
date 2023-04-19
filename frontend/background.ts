import { Storage } from "@plasmohq/storage";

const storage = new Storage();
let text = "";
let prevPiece = "";
let prevPieceListLowerCase = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "storeText") {
    const { content } = request;
    text = content + ' ' + text;
    sendResponse({ message: 'Stored: ' + text});
  }
  
  return true;
});
