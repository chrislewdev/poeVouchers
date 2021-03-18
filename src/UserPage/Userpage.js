import React, { useContext, useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { UserContext } from "../Global/UserContext";
import { db } from "../Firebase";
import "./Userpage.css";

function Userpage() {
  const { currentUser, currentUserLoading } = useContext(UserContext);

  useEffect(() => {
    if (currentUserLoading === false) {
      const userREF = db.collection("users").doc(currentUser.uid);
      setCurrentUserREF(userREF);
    }
  }, [currentUser]);

  const [currentUserREF, setCurrentUserREF] = useState(null);

  const [value, dataLoading, dataError] = useDocumentData(currentUserREF);

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
