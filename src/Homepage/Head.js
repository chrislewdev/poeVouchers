import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Global/UserContext";
import { auth } from "../Firebase";
import HeaderButton from "../Global/HeaderButton";
import HeadTitle from "../Global/HeadTitle";
import "./Head.css";

function Head() {
  const history = useHistory();

  const { currentUser } = useContext(UserContext);

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
        {currentUser ? (
          <HeaderButton
            buttonName="Create"
            handleClick={() => history.push("/create")}
          />
        ) : (
          <></>
        )}
        {currentUser ? (
          <HeaderButton
            buttonName="User"
            handleClick={() => history.push("/user")}
          />
        ) : (
          <></>
        )}
        <HeaderButton
          buttonName="Register"
          handleClick={() => history.push("/signup")}
        />
        <HeaderButton
          buttonName={currentUser ? "Logout" : "Login"}
          handleClick={
            currentUser ? signOutFunction : () => history.push("/signin")
          }
        />
      </div>
    </div>
  );
}

export default Head;
