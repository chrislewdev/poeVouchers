import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import SelectionButton from "../Global/SelectionButton";
import "./ListingPage.css";

function ListingPage({ docID, toggleListingPage }) {
  const [listing, setListing] = useState({});

  const query = db.collection("listings").where("docID", "==", docID);

  const [value, dataLoading, dataError] = useCollectionData(query);

  useEffect(() => {
    if (value != undefined) {
      const listing = {
        price: value[0].price,
        title: value[0].title,
        detail: value[0].detail,
        sellerUID: value[0].sellerUID,
        sellerUsername: value[0].sellerUsername,
        vouched: value[0].vouched,
        vouchedByUsername: value[0].vouchedByUsername,
        vouchedByUID: value[0].vouchedByUID,
        docID: value[0].docID,
      };

      setListing(listing);
    }
  }, [value]);

  return (
    <div className="up-lp-background">
      <div>
        <div className="up-lp-back-button">
          <HeaderButton buttonName="<" handleClick={toggleListingPage} />
        </div>
        <div className="up-lp-body-container">
          <div className="up-lp-box-one">
            <SelectionButton buttonName={listing.selectedServices} />
          </div>
          <div className="up-lp-box-two">{listing.title}</div>
          <div className="up-lp-box-three">{listing.price}</div>
          <div className="up-lp-box-four">{listing.detail}</div>
          <div className="up-lp-box-five">
            <HeaderButton
              buttonName="Edit"
              handleClick={() => console.log(listing)}
            />
          </div>
          <div className="up-lp-box-six">
            <HeaderButton buttonName="Delete" />
          </div>
          <div className="up-lp-box-seven">
            {listing.vouched ? (
              <HeaderButton buttonName="complete" />
            ) : (
              <HeaderButton buttonName="-" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
