import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";
import { db } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import SelectionButton from "../Global/SelectionButton";
import { UserContext } from "../Global/UserContext";
import "./ListingPage.css";

function ListingPage({ docID, toggleListingPage }) {
  const history = useHistory();

  const { currentUserData } = useContext(UserContext);

  const [listing, setListing] = useState({});

  const query = db.collection("listings").where("docID", "==", docID);

  const [listingData, setListingData] = useState(null);

  const [listingDataDeleted, setListingDataDeleted] = useState(false);

  const [value, dataLoading, dataError] = useCollectionData(query);

  const [editMode, toggleEditMode] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const handleChangeNewTitle = (e) => setNewTitle(e.target.value);

  const [newPrice, setNewPrice] = useState("");
  const handleChangeNewPrice = (e) => setNewPrice(e.target.value);

  const [newDetail, setNewDetail] = useState("");
  const handleChangeNewDetail = (e) => setNewDetail(e.target.value);

  useEffect(() => {
    if (value != undefined) {
      setListingData(value);
    }
  }, [value]);

  useEffect(() => {
    if (listingData != null && listingDataDeleted == false) {
      const listing = {
        price: listingData[0].price,
        title: listingData[0].title,
        detail: listingData[0].detail,
        selectedServices: listingData[0].selectedServices,
        sellerUID: listingData[0].sellerUID,
        sellerUsername: listingData[0].sellerUsername,
        vouched: listingData[0].vouched,
        vouchedByUsername: listingData[0].vouchedByUsername,
        vouchedByUID: listingData[0].vouchedByUID,
        docID: listingData[0].docID,
      };

      setListing(listing);

      setNewTitle(listing.title);
      setNewPrice(listing.price);
      setNewDetail(listing.detail);
    }
  }, [listingData]);

  const handleCompleteClick = () => {
    db.collection("users")
      .doc(currentUserData[0].userUID)
      .update({
        vouches: currentUserData[0].vouches++,
        listingCreated: currentUserData[0].listingCreated--,
      })
      // .then(() => alert("Listing deleted"))
      .then(() => {
        // window.location.reload();
        setListingData(null);
        setListingDataDeleted(true);
        toggleListingPage();
      })
      .then(() => {
        db.collection("listings")
          .doc(docID)
          .delete()
          .catch((error) => alert(error));
      });
  };

  const handleConfirmEditClick = () => {
    toggleEditMode(false);
    if (
      newTitle != listing.title ||
      newPrice != listing.price ||
      newDetail != listing.detail
    ) {
      db.collection("listings").doc(docID).update({
        title: newTitle,
        price: newPrice,
        detail: newDetail,
      });
    }
  };

  const handleDeleteClick = () => {
    db.collection("users")
      .doc(currentUserData[0].userUID)
      .update({
        listingCreated: currentUserData[0].listingCreated--,
      })
      .then(() => {
        // window.location.reload();
        setListingData(null);
        setListingDataDeleted(true);
        toggleListingPage();
      })
      .then(() => {
        db.collection("listings")
          .doc(docID)
          .delete()
          .catch((error) => alert(error));
      });
  };

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
          {editMode ? (
            <input
              type="text"
              value={newTitle}
              maxlength="20"
              onChange={handleChangeNewTitle}
              className={"new-title-fields"}
            ></input>
          ) : (
            <div className="up-lp-box-two">{listing.title}</div>
          )}
          {editMode ? (
            <input
              type="text"
              value={newPrice}
              maxlength="6"
              onChange={handleChangeNewPrice}
              className={"new-price-fields"}
            ></input>
          ) : (
            <div className="up-lp-box-three">{listing.price}</div>
          )}
          {editMode ? (
            <input
              type="text"
              value={newDetail}
              maxlength="40"
              onChange={handleChangeNewDetail}
              className={"new-detail-fields"}
            ></input>
          ) : (
            <div className="up-lp-box-four">{listing.detail}</div>
          )}
          <div className="up-lp-box-five">
            {editMode ? (
              <HeaderButton
                buttonName="Confirm"
                handleClick={handleConfirmEditClick}
              />
            ) : (
              <HeaderButton
                buttonName="Edit"
                handleClick={() => toggleEditMode(true)}
              />
            )}
          </div>
          <div className="up-lp-box-six">
            <HeaderButton buttonName="Delete" handleClick={handleDeleteClick} />
          </div>
          <div className="up-lp-box-seven">
            {listing.vouched ? (
              <HeaderButton
                buttonName="Complete"
                handleClick={handleCompleteClick}
              />
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
