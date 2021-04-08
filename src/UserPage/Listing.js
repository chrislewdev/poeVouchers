import React from "react";
import "./Listing.css";

function Listing({ listing, handleClick }) {
  return (
    <div className="listing-container">
      <div className="listing-price">{listing.price}</div>
      <div className="listing-title" onClick={() => handleClick(listing.docID)}>
        {listing.title}
      </div>
    </div>
  );
}

export default Listing;
