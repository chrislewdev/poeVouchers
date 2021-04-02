import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../Firebase";
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const handleChangeUsername = (e) => setUsername(e.target.value);

  const [email, setEmail] = useState("");
  const handleChangeEmail = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState("");
  const handleChangePassword = (e) => setPassword(e.target.value);

  const history = useHistory();

  const handleSubmitClick = () => {
    const newUser = {
      username: username,
      email: email,
      password: password,
      uid: "",
      createdAt: "",
      vouches: 0,
      vouchHistory: [],
      listingCreated: 0,
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
            })
            .then(() => alert("Signup Successful"))
            .then(() => history.push("/"));
        }
      });
  };

  return (
    <div className={"signup-container"}>
      <div className={"signup-wrapper"}>
        <div className={"signup-title"}>SIGN UP</div>
        <div className={"signup-box"}>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>username:</div>
            <input
              type="text"
              value={username}
              maxlength="12"
              onChange={handleChangeUsername}
              className={"signup-fields"}
            ></input>
          </div>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>email:</div>
            <input
              type="text"
              value={email}
              maxlength="40"
              onChange={handleChangeEmail}
              className={"signup-fields"}
            ></input>
          </div>
          <div className={"options-wrapper"}>
            <div className={"signup-texts"}>password:</div>
            <input
              type="text"
              value={password}
              maxlength="20"
              onChange={handleChangePassword}
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
