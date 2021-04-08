import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";
import { UserContext } from "../Global/UserContext";
import { db } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import "./Userpage.css";
import Listing from "./Listing";
import ListingPage from "./ListingPage";

function Userpage() {
  let history = useHistory();

  const [listingPage, toggleListingPage] = useState(false);

  const [currentDocID, setCurrentDocID] = useState("");

  const { currentUser, currentUserData } = useContext(UserContext);

  const listingREF = db
    .collection("listings")
    .where("sellerUID", "==", currentUser.uid);

  const [listingValue, listingDataLoading] = useCollectionData(listingREF);

  const [listingsArray, setListingsArray] = useState([]);

  useEffect(() => {
    if (listingValue != undefined) {
      setListingsArray(listingValue);
    }
  }, [listingValue]);

  const listingRender = listingsArray.map((listing) => (
    <Listing
      listing={listing}
      handleClick={(docID) => {
        setCurrentDocID(docID);
        toggleListingPage(true);
      }}
    />
  ));

  return listingPage ? (
    <ListingPage
      docID={currentDocID}
      toggleListingPage={() => toggleListingPage(false)}
    />
  ) : (
    <div className="userpage-background">
      <div className="userpage-wrapper">
        {/* <div className="userpage-title">User Profile</div> */}
        <div className="userpage-back-button">
          <HeaderButton buttonName="<" handleClick={() => history.push("/")} />
        </div>
        <div className="userpage-body-container">
          <div className="userpage-body-box1">
            <div className="userpage-username">
              {currentUserData[0].username}
            </div>
            <div className="userpage-vouches">
              {`vouches:  ${currentUserData[0].vouches}`}
            </div>
            <div className="userpage-vouches">
              {`created:  ${currentUserData[0].listingCreated}`}
            </div>
          </div>
          <div className="userpage-body-box2">{listingRender}</div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
