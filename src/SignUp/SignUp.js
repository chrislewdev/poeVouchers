import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../Firebase";
import { UserContext } from "../Global/UserContext";
import "./SignUp.css";

function SignUp() {
  const { currentUser, currentUserData, currentUserDataLoading } = useContext(
    UserContext
  );

  const [username, setUsername] = useState("");
  const handleChangeUsername = (e) => setUsername(e.target.value);

  const [email, setEmail] = useState("");
  const handleChangeEmail = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState("");
  const handleChangePassword = (e) => setPassword(e.target.value);

  const [discord, setDiscord] = useState("");
  const handleChangeDiscord = (e) => setDiscord(e.target.value);

  const [poeProfile, setPoeProfile] = useState("");
  const handleChangePoeProfile = (e) => setPoeProfile(e.target.value);

  const history = useHistory();

  const handleSubmitClick = () => {
    if (currentUserData[0].userUID === "SHakREmE6cMeoKOf8RSOQkyFPnT2") {
      const newUser = {
        username: username,
        email: email,
        password: password,
        uid: "",
        createdAt: "",
        vouches: 0,
        vouchHistory: [],
        listingCreated: 0,
        discord: discord,
        poeProfile: poeProfile,
      };

      auth
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            alert(
              "Please try again with stronger password combination of at least 6 inputs"
            );
          } else if (errorCode === "auth/email-already-in-use") {
            alert("Email is already in used");
          } else if (errorCode === "auth/invalid-email") {
            alert("Invalid email");
          } else {
            alert(errorMessage);
          }
        })
        .then((cred) => {
          if (cred != null) {
            var today = new Date();

            db.collection("users")
              .doc(cred.user.uid)
              .set({
                email: newUser.email,
                password: newUser.password,
                username: newUser.username,
                userUID: cred.user.uid,
                createdAt: `${today.getFullYear()} - ${
                  today.getMonth() + 1
                } - ${today.getDate()}`,
                vouches: 0,
                vouchHistory: [],
                listingCreated: 0,
                discord: newUser.discord,
                poeProfile: newUser.poeProfile,
              })
              .then(() => alert("Signup Successful"))
              .then(() => history.push("/"));
          }
        });
    } else {
      alert("Restricted permission !");
    }
  };

  return (
    <div className={"signup-container"}>
      <div className={"signup-wrapper"}>
        <div className={"signup-title"}>SIGN UP</div>
        <div className={"signup-box"}>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>Username:</div>
            <input
              type="text"
              value={username}
              maxlength="12"
              onChange={handleChangeUsername}
              className={"signup-fields"}
            ></input>
          </div>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>Email:</div>
            <input
              type="text"
              value={email}
              maxlength="40"
              onChange={handleChangeEmail}
              className={"signup-fields"}
            ></input>
          </div>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>Password:</div>
            <input
              type="text"
              value={password}
              maxlength="20"
              onChange={handleChangePassword}
              className={"signup-fields"}
            ></input>
          </div>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>Discord:</div>
            <input
              type="text"
              value={discord}
              maxlength="30"
              onChange={handleChangeDiscord}
              className={"signup-fields"}
            ></input>
          </div>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>Poe Profile:</div>
            <input
              type="text"
              value={poeProfile}
              maxlength="100"
              onChange={handleChangePoeProfile}
              className={"signup-fields"}
            ></input>
          </div>

          <div className={"signup-submit-button-wrapper"}>
            <div onClick={handleSubmitClick} className={"signup-submit-button"}>
              SUBMIT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
