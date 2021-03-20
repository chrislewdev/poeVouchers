import React from "react";
import "./SelectionButton.css";

function SelectionButton(props) {
  return (
    <div
      className={
        props.activeButton === props.buttonName
          ? "selection-button-clicked"
          : "selection-button"
      }
      onClick={props.handleClick}
    >
      {props.buttonName}
    </div>
  );
}

export default SelectionButton;
