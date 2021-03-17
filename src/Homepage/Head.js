import React from "react";
import HeaderButton from "../Global/HeaderButton";
import HeadTitle from "../Global/HeadTitle";
import "./Head.css";

function Head(props) {
  return (
    <div className={"head-container"}>
      <HeadTitle headTitle="poeVouchers" />
      <HeaderButton buttonName="Create" />
      <HeaderButton buttonName="Sign Up" />
      <HeaderButton buttonName="Sign In" />
    </div>
  );
}

export default Head;
