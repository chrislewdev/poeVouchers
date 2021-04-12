import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserContext } from "../Global/UserContext";
import HeaderButton from "../Global/HeaderButton";
import "./ListingPage.css";

function ListingPage({ toggleListingPage, docID, vouches }) {
  const [listing, setListing] = useState({});

  const query = db.collection("listings").where("docID", "==", docID);

  const [value, dataLoading] = useCollectionData(query);

  const { currentUserData } = useContext(UserContext);

  useEffect(() => {
    if (value !== undefined) {
      if (value.length !== 0) {
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
          sellerDiscord: value[0].sellerDiscord,
          sellerPoeProfile: value[0].sellerPoeProfile,
        };

        setListing(listing);
      }
    }
  }, [value]);

  const handleVouchClick = () => {
    if (value.length !== 0) {
      if (listing.vouched === false) {
        if (listing.sellerUsername !== currentUserData[0].username) {
          db.collection("listings").doc(docID).update({
            vouched: true,
            vouchedByUsername: currentUserData[0].username,
            vouchedByUID: currentUserData[0].userUID,
          });
        }
      }
      if (listing.vouched === true) {
        if (listing.vouchedByUID === currentUserData[0].userUID) {
          db.collection("listings").doc(docID).update({
            vouched: false,
            vouchedByUsername: "",
            vouchedByUID: "",
          });
        }
      }
    } else {
      alert("Listing might be completed or deleted !");
      toggleListingPage();
    }
  };

  return dataLoading ? (
    <></>
  ) : value.length !== 0 ? (
    <div className="lp-background">
      <div>
        <div className="lp-back-button">
          <HeaderButton buttonName="<" handleClick={toggleListingPage} />
        </div>
        <div className="lp-body-container">
          <div className="lp-box-one">{listing.title}</div>
          <div className="lp-box-two">{listing.sellerUsername}</div>
          <div className="lp-box-three">{`Vouches: ${vouches}`}</div>
          <div className="lp-box-four">{listing.sellerDiscord}</div>
          <div className="lp-box-five">
            <a href={listing.sellerPoeProfile} target="_blank">
              POE Profile
            </a>
          </div>
          <div className="lp-box-six">{listing.price}</div>
          <div className="lp-box-seven">{listing.detail}</div>
          <div className="lp-box-eight">
            <div className="lp-vouch-button" onClick={handleVouchClick}>
              {listing.vouched
                ? listing.vouchedByUID === currentUserData[0].userUID
                  ? "unvouch"
                  : "vouched"
                : "vouch"}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="listing-not-found-wrapper">
      <div className="lp-back-button">
        <HeaderButton buttonName="<" handleClick={toggleListingPage} />
      </div>
      <div className="listing-not-found-title">
        Listing might have been completed or deleted !
      </div>
    </div>
  );
}

export default ListingPage;
