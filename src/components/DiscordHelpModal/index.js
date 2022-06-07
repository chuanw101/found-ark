import React from "react";
import "./style.css";

function DiscordHelpModal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
        </div>
        <div className="title">
          <h1>Follow the steps to embed your own discord channel!</h1>
        </div>
        <div className="body">
          <p>Steps</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}>
            Got it, Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscordHelpModal;