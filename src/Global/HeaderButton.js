import React from "react";
import "./HeaderButton.css";

function HeaderButton({ buttonName, handleClick }) {
  return (
    <div className="header-button" onClick={handleClick}>
      {buttonName}
    </div>
  );
}

export default HeaderButton;
