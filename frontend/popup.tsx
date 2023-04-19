import { useState } from "react"
import './styles.css';

function IndexPopup() {
  const [email, setEmail] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleEmailButtonClick = () => {
    console.log('Email submitted:', email);
  };

  const handleToggleChange = () => {
    const newToggleValue = !toggle;
    setToggle(newToggleValue);

    if (newToggleValue) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, {message: "startObserving"}, (response) => {
          console.log(response.message)
        });
      });
    } else {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, {message: "stopObserving"}, (response) => {
          console.log(response.message)
        });
      });
    }
  };

  return (
    <div>
      <div className="header">
        <h1 className="company-name">Spanglish</h1>
        <span className="donut-emoji" role="img" aria-label="donut emoji">🍩</span>
      </div>
      <div className="container">
        <div className="email-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handleEmailButtonClick}>Submit</button>
        </div>
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox" checked={toggle} onChange={handleToggleChange} />
            <span className="slider round"></span>
          </label>
          <span className="toggle-label">Turn-on captions for notes</span>
        </div>
      </div>
    </div>
  );
}

export default IndexPopup
