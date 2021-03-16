import React from "react";
import "./SelectionButton.css";

function SelectionButton(props) {
  return (
    <div className="selection-button" onClick={props.handleClick}>
      {props.buttonName}
    </div>
  );
}

export default SelectionButton;
