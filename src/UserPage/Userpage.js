import React, { useContext, useEffect, useState } from "react";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";
import { UserContext } from "../Global/UserContext";
import { db } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import "./Userpage.css";
import Listing from "./Listing";

function Userpage() {
  let history = useHistory();

  const { currentUser, currentUserLoading } = useContext(UserContext);

  const [currentUserREF, setCurrentUserREF] = useState(null);

  const [value, dataLoading, dataError] = useDocumentData(currentUserREF);

  const [listingsArray, setListingsArray] = useState([]);

  const [listingREF, setListingREF] = useState(null);

  const [
    listingValue,
    listingDataLoading,
    listingDataError,
  ] = useCollectionData(listingREF);

  useEffect(() => {
    if (currentUserLoading === false) {
      const userREF = db.collection("users").doc(currentUser.uid);
      setCurrentUserREF(userREF);

      const listingREF = db
        .collection("listings")
        .where("sellerUID", "==", currentUser.uid);
      setListingREF(listingREF);
    }
  }, [currentUser]);

  useEffect(() => {
    if (listingValue != undefined) {
      setListingsArray(listingValue);
    }
  }, [listingValue]);

  const listingRender = listingsArray.map((listing) => (
    <Listing price={listing.price} title={listing.title} />
  ));

  return (
    <div className="userpage-background">
      <div className="userpage-wrapper">
        {/* <div className="userpage-title">User Profile</div> */}
        <div className="userpage-back-button">
          <HeaderButton buttonName="<" handleClick={() => history.push("/")} />
        </div>
        <div className="userpage-body-container">
          <div className="userpage-body-box1">
            <div className="userpage-username">
              {value ? value.username : "loading..."}
            </div>
            <div className="userpage-vouches">
              {value ? `vouches:  ${value.vouches}` : "loading..."}
            </div>
            <div className="userpage-vouches">
              {value ? `created:  ${value.listingCreated}` : "loading..."}
            </div>
          </div>
          <div className="userpage-body-box2">{listingRender}</div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
