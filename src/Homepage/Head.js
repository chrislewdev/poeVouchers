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
        <HeaderButton
          style={{ marginRight: "32px" }}
          buttonName="How To"
          handleClick={() => history.push("/howto")}
        />
        {currentUser ? (
          <HeaderButton
            style={{ marginRight: "32px" }}
            buttonName="New"
            handleClick={() => history.push("/create")}
          />
        ) : (
          <></>
        )}
        {currentUser ? (
          <HeaderButton
            style={{ marginLeft: "32px" }}
            buttonName="Profile"
            handleClick={() => history.push("/user")}
          />
        ) : (
          <></>
        )}
        {/* <HeaderButton
          style={{ marginRight: "32px" }}
          buttonName="Register"
          handleClick={() => history.push("/signup")}
        /> */}
        <HeaderButton
          style={{ marginRight: "32px" }}
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
