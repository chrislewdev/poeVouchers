import React from "react";
import "./SelectionButton.css";

function SelectionButton({ buttonName, activeButton, handleClick }) {
  return (
    <div
      className={
        activeButton === buttonName
          ? "selection-button-clicked"
          : "selection-button"
      }
      onClick={handleClick}
    >
      {buttonName}
    </div>
  );
}

export default SelectionButton;
