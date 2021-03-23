import React from "react";
import "./ListingPage.css";

function ListingPage() {
  return (
    <div className="lp-background">
      <div className="lp-wrapper">
        <div className="lp-title">Listing</div>
        <div className="lp-body-container">
          <div className="lp-left-container">
            <div className="lp-left-box-one"></div>
            <div className="lp-left-box-two"></div>
            <div className="lp-left-box-three"></div>
            <div className="lp-left-box-four"></div>
          </div>
          {/* <div className="lp-box-five"></div>
          <div className="lp-box-six"></div>
          <div className="lp-box-seven"></div>
          <div className="lp-box-eight"></div> */}
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
