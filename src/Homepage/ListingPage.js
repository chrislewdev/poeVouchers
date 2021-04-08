import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserContext } from "../Global/UserContext";
import HeaderButton from "../Global/HeaderButton";
import "./ListingPage.css";

function ListingPage(props) {
  const [listing, setListing] = useState({});

  const query = db.collection("listings").where("docID", "==", props.docID);

  const [value, dataLoading, dataError] = useCollectionData(query);

  const { currentUserData } = useContext(UserContext);

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

  const handleVouchClick = () => {
    if (listing.vouched == false) {
      db.collection("listings").doc(props.docID).update({
        vouched: true,
        vouchedByUsername: currentUserData[0].username,
        vouchedByUID: currentUserData[0].userUID,
      });
    }
    if (listing.vouched == true) {
      if (listing.vouchedByUID == currentUserData[0].userUID) {
        db.collection("listings").doc(props.docID).update({
          vouched: false,
          vouchedByUsername: "",
          vouchedByUID: "",
        });
      }
    }
  };

  return (
    <div className="lp-background">
      <div className="lp-wrapper">
        {/* <div className="lp-title">Listing</div> */}
        <div className="lp-back-button">
          <HeaderButton buttonName="<" handleClick={props.toggleListingPage} />
        </div>
        <div className="lp-body-container">
          <div className="lp-box-one">{listing.title}</div>
          <div className="lp-box-two">{listing.sellerUsername}</div>
          <div className="lp-box-three">{`Vouches: ${currentUserData[0].vouches}`}</div>
          <div className="lp-box-four">Discord: aaaaaaaaaaaa </div>
          <div className="lp-box-five">POE Profile</div>
          <div className="lp-box-six">{listing.price}</div>
          <div className="lp-box-seven">{listing.detail}</div>
          <div className="lp-box-eight">
            <div className="lp-vouch-button" onClick={handleVouchClick}>
              {listing.vouched
                ? listing.vouchedByUID == currentUserData[0].userUID
                  ? "unvouch"
                  : "vouched"
                : "vouch"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
