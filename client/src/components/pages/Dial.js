import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import "./Dial.css"; // Import the CSS file

const Dial = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleDial = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="dial-container">
        <div className="dial-card">
      <h2 className="dial-title">Phone Number Dialer</h2>
      <div className="input-center">
      <input
        type="tel"
        className="dial-input"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={handleInputChange}
      />
      </div>
      <div className="dial-keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((number) => (
          <button
            key={number}
            className="dial-button"
            onClick={() => setPhoneNumber((prevNumber) => prevNumber + number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="center-dial">
      <button className="dial-action-button" onClick={handleDial}>
      <FontAwesomeIcon icon={faPhone} className="dial-icon" /> Dial
      </button>
      </div>
      </div>
    </div>
  );
};

export default Dial;

