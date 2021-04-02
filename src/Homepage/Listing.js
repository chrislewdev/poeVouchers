import React from "react";
import "./Listing.css";

function Listing(props) {
  const listingObject = {
    vouches: props.vouches,
    price: props.price,
    title: props.title,
    detail: props.detail,
    sellerUID: props.sellerUID,
    sellerUsername: props.sellerUsername,
    vouched: props.vouched,
    vouchedBy: props.vouchedBy,
    docID: props.docID,
  };

  const handleOnClick = () => {
    props.handleClick(listingObject);
  };

  return (
    <div className="listing-container">
      <div className="listing-vouches">{listingObject.vouches}</div>
      <div style={{ marginRight: "10px" }}> - </div>
      <div className="listing-price">{listingObject.price}</div>
      <div className="listing-title" onClick={handleOnClick}>
        {listingObject.title}
      </div>
    </div>
  );
}

export default Listing;
