import React, { useState } from "react";
import { db } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import "./ListingPage.css";

function ListingPage(props) {
  const [vouchedState, setVouchedState] = useState(props.vouched);

  const handleVouchClick = () => {
    const toggledVouchedState = !vouchedState;
    db.collection("listings").doc(props.docID).update({
      vouched: toggledVouchedState,
      vouchedBy: props.sellerUID,
    });
    setVouchedState(toggledVouchedState);
  };

  return (
    <div className="lp-background">
      <div className="lp-wrapper">
        {/* <div className="lp-title">Listing</div> */}
        <div className="lp-back-button">
          <HeaderButton buttonName="<" handleClick={props.toggleListingPage} />
        </div>
        <div className="lp-body-container">
          <div className="lp-box-one">{props.title}</div>
          <div className="lp-box-two">{props.sellerUsername}</div>
          <div className="lp-box-three">{`Vouches: ${props.vouches}`}</div>
          <div className="lp-box-four">Discord: aaaaaaaaaaaa </div>
          <div className="lp-box-five">POE Profile</div>
          <div className="lp-box-six">{props.price}</div>
          <div className="lp-box-seven">{props.detail}</div>
          <div className="lp-box-eight">
            <div className="lp-vouch-button" onClick={handleVouchClick}>
              {vouchedState ? "unvouch" : "vouch"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
