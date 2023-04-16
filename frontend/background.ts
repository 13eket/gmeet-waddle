import { Storage } from "@plasmohq/storage";

const storage = new Storage();
let text = "";
let prevPiece = "";
let prevPieceListLowerCase = [];

function isFirstListPrefixOfSecondList(firstList: string[], secondList: string[]): boolean {
  if (firstList.length > secondList.length)
    return false;

  const firstListWords = firstList.join(' ');
  const secondListWords = secondList.slice(0, firstList.length).join(' ');

  return firstListWords === secondListWords;
}

function appendNewTextPiece(newPiece: string): void {
	// Only words (including hyphened words) without punctuations
	const newPieceListLowerCase = newPiece.replace(/[^\p{L}\p{N}\s-]/gu, '')
																				.toLowerCase()
																				.split(/\s+/);

	if (!isFirstListPrefixOfSecondList(prevPieceListLowerCase, newPieceListLowerCase)) {
		text += ' ' + prevPiece;
		storage.set("text", text);
	}

	prevPiece = newPiece;
	prevPieceListLowerCase = newPieceListLowerCase;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "storeText") {
    const { content } = request;
    appendNewTextPiece(content);
    sendResponse({ message: 'Stored: ' + text});
  }
  
  return true;
});
