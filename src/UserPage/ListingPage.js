import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import SelectionButton from "../Global/SelectionButton";
import { UserContext } from "../Global/UserContext";
import "./ListingPage.css";

function ListingPage({ docID, toggleListingPage }) {
  const { currentUserData } = useContext(UserContext);

  const [listing, setListing] = useState({});

  const query = db.collection("listings").where("docID", "==", docID);

  const [listingData, setListingData] = useState(null);

  const [listingDataDeleted, setListingDataDeleted] = useState(false);

  const [value, dataLoading] = useCollectionData(query);

  const [editMode, toggleEditMode] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const handleChangeNewTitle = (e) => setNewTitle(e.target.value);

  const [newPrice, setNewPrice] = useState("");
  const handleChangeNewPrice = (e) => setNewPrice(e.target.value);

  const [newDetail, setNewDetail] = useState("");
  const handleChangeNewDetail = (e) => setNewDetail(e.target.value);

  useEffect(() => {
    if (value !== undefined) {
      setListingData(value);
    }
  }, [value]);

  useEffect(() => {
    if (listingData !== null && listingDataDeleted === false) {
      if (value.length !== 0) {
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
    }
  }, [listingData]);

  const handleCompleteClick = () => {
    db.collection("users")
      .doc(currentUserData[0].userUID)
      .update({
        vouches: currentUserData[0].vouches++,
        listingCreated: currentUserData[0].listingCreated--,
      })
      .then(() => {
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
      newTitle !== listing.title ||
      newPrice !== listing.price ||
      newDetail !== listing.detail
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
        listingCreated: 0,
      })
      .then(() => {
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

  return dataLoading ? (
    <></>
  ) : value.length !== 0 ? (
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
              maxlength="40"
              onChange={handleChangeNewTitle}
              className={"edit-fields"}
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
              className={"edit-fields"}
            ></input>
          ) : (
            <div className="up-lp-box-three">{listing.price}</div>
          )}
          {editMode ? (
            <textarea
              type="text"
              value={newDetail}
              maxlength="100"
              onChange={handleChangeNewDetail}
              className={"edit-fields"}
            ></textarea>
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
            {editMode ? (
              <HeaderButton
                buttonName="Cancel"
                handleClick={() => toggleEditMode(false)}
              />
            ) : (
              <HeaderButton
                buttonName="Delete"
                handleClick={handleDeleteClick}
              />
            )}
          </div>
          <div className="up-lp-box-seven">
            {listing.vouched ? (
              <div className="vouched-wrapper">
                <div>Vouched by:</div>
                <div className="vouched-by">{listing.vouchedByUsername}</div>
                <HeaderButton
                  buttonName="Complete"
                  handleClick={handleCompleteClick}
                />
              </div>
            ) : (
              <HeaderButton buttonName="-" />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="listing-not-found-wrapper">
      <div className="up-lp-back-button">
        <HeaderButton buttonName="<" handleClick={toggleListingPage} />
      </div>
      <div className="listing-not-found-title">
        Listing might have been completed or deleted !
      </div>
    </div>
  );
}

export default ListingPage;
