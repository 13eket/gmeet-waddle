import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  const handleStartClick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, {message: "startObserving"}, (response) => {
      });
    });
  }

  const handleStopClick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, {message: "stopObserving"}, (response) => {
      });
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  )
}

export default IndexPopup
