import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import "./Userpage.css";

function Userpage() {
  const [currentUser, currentUserLoading] = useAuthState(auth);

  const [currentUserREF, setCurrentUserREF] = useState(null);

  useEffect(() => {
    if (currentUserLoading === false) {
      const userREF = db.collection("users").doc(currentUser.uid);
      setCurrentUserREF(userREF);
    }
  }, [currentUser]);

  const [value, dataLoading, dataError] = useDocumentData(currentUserREF);

  // useEffect(() => console.log("currentUser"), [currentUser]);

  // useEffect(() => console.log("currentUserREF"), [currentUserREF]);

  // useEffect(() => console.log("value"), [value]);

  // const print = () => {
  //   console.log(currentUser);
  //   console.log(value);
  // };

  return (
    <div className="userpage-background">
      <div className="userpage-wrapper">
        <div className="userpage-title">User Profile</div>
        <div className="userpage-body-container">
          <div className="userpage-body-box1">
            <div className="userpage-username">
              {value ? value.username : "loading..."}
            </div>
            <div className="userpage-vouches">
              {value ? `vouches:  ${value.vouches}` : "loading..."}
            </div>
          </div>
          <div className="userpage-body-box2"></div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
