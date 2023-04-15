import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  const handleClick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, {message: "stop"}, (response) => {
        console.log(response.message);
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
      <button onClick={handleClick}>Stop</button>
    </div>
  )
}

export default IndexPopup
