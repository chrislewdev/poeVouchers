import React from "react";
import "./Listing.css";

function Listing(props) {
  return (
    <div className="listing-container">
      <div className="listing-vouches">{props.vouches}</div>
      <div className="listing-price">{props.price}</div>
      <div className="listing-title">{props.title}</div>
    </div>
  );
}

export default Listing;
