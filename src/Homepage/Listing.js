import React, { useEffect, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import "./Listing.css";

function Listing({ listing, handleClick }) {
  const sellerUserQuery = db
    .collection("users")
    .where("username", "==", listing.sellerUsername);

  const [sellerData, dataLoading] = useCollectionDataOnce(sellerUserQuery);

  const [sellerVouches, setSellerVouches] = useState("");

  useEffect(() => {
    if (sellerData !== undefined) {
      setSellerVouches(sellerData[0].vouches);
    }
  }, [sellerData]);

  return (
    <div className="listing-container">
      <div className="listing-vouches">{dataLoading ? "-" : sellerVouches}</div>
      <div style={{ marginRight: "10px" }}> - </div>
      <div className="listing-price">{listing.price}</div>
      <div
        className="listing-title"
        onClick={() => handleClick(listing.docID, sellerVouches)}
      >
        {listing.title}
      </div>
    </div>
  );
}

export default Listing;
