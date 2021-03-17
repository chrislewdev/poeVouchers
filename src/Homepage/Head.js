import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import HeadTitle from "../Global/HeadTitle";
import "./Head.css";

function Head(props) {
  const history = useHistory();

  const isLoggedIn = props.currentUser;

  const signOutFunction = () => {
    auth
      .signOut()
      .then(() => alert("Logout successful"))
      .then(() => history.push("/"));
  };

  return (
    <div className="head-container">
      <HeadTitle headTitle="poeVouchers" />
      <div className="head-buttons-container">
        {isLoggedIn ? <HeaderButton buttonName="Create" /> : <></>}
        <HeaderButton
          buttonName="User"
          handleClick={() => history.push("/user")}
        />
        <HeaderButton
          buttonName="Register"
          handleClick={() => history.push("/signup")}
        />
        <HeaderButton
          buttonName={isLoggedIn ? "Logout" : "Login"}
          handleClick={
            isLoggedIn ? signOutFunction : () => history.push("/signin")
          }
        />
      </div>
    </div>
  );
}

export default Head;
