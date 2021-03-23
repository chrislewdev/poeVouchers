import React, { useState } from "react";
import { auth } from "../Firebase";
import { useHistory } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const handleChangeEmail = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState("");
  const handleChangePassword = (e) => setPassword(e.target.value);

  const history = useHistory();

  const handleLoginClick = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        if (cred != null) {
          alert("Login successful");
          history.push("/");
        }
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
          alert("Invalid email or password");
        } else if (errorCode === "auth/wrong-password") {
          alert("Invalid email or password");
        } else if (errorCode === "auth/user-not-found") {
          alert("Invalid email or password");
        } else {
          alert(errorMessage);
        }
      });
  };

  return (
    <div className={"signin-container"}>
      <div className={"signin-wrapper"}>
        <div className={"signin-title"}>SIGN IN</div>
        <div className={"signin-box"}>
          <div className={"options-wrapper"}>
            <div className={"signin-texts"}>email:</div>
            <input
              type="text"
              value={email}
              maxlength="40"
              onChange={handleChangeEmail}
              className={"signin-fields"}
            ></input>
          </div>
          <div className={"options-wrapper"}>
            <div className={"signin-texts"}>password:</div>
            <input
              type="text"
              value={password}
              maxlength="20"
              onChange={handleChangePassword}
              className={"signin-fields"}
            ></input>
          </div>
          <div className={"signin-button-wrapper"}>
            <div onClick={handleLoginClick} className={"signin-button"}>
              ENTER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
