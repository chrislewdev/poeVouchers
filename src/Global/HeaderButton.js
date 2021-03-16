import React from "react";
import "./HeaderButton.css";

function HeaderButton(props) {
  return (
    <div className="header-button" onClick={props.handleClick}>
      {props.buttonName}
    </div>
  );
}

export default HeaderButton;
