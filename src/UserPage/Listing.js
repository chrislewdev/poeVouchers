import React from "react";
import "./Listing.css";

function Listing(props) {
  //   const listingObject = {
  //     vouches: props.vouches,
  //     price: props.price,
  //     title: props.title,
  //     sellerUID: props.sellerUID,
  //     vouched: props.vouched,
  //     vouchedBy: props.vouchedBy,
  //     docID: props.docID,
  //   };

  const handleOnClick = () => {};

  return (
    <div className="listing-container">
      <div className="listing-price">{props.price}</div>
      <div className="listing-title" onClick={handleOnClick}>
        {props.title}
      </div>
    </div>
  );
}

export default Listing;
