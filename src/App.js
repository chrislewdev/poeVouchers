import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { UserContext } from "./Global/UserContext";
import { auth } from "./Firebase";
import Homepage from "./Homepage/Homepage";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Userpage from "./UserPage/Userpage";
import CreateListing from "./CreateListing/CreateListing";
import { useEffect, useState } from "react";
import { db } from "./Firebase";

function App() {
  const [currentUser, currentUserLoading] = useAuthState(auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUserQuery, setCurrentUserQuery] = useState(null);

  const [
    currentUserData,
    currentUserDataLoading,
    dataError,
  ] = useCollectionData(currentUserQuery);

  useEffect(() => {
    console.log(currentUserData);
  });

  useEffect(() => {
    if (currentUser != null) {
      const userQuery = db
        .collection("users")
        .where("userUID", "==", currentUser.uid);

      setCurrentUserQuery(userQuery);
    }
  }, [currentUserLoading, currentUser]);

  useEffect(() => {
    if (currentUser != null) {
      setIsLoggedIn(true);
    }
  });

  useEffect(() => {
    if (currentUser == null) {
      setIsLoggedIn(false);
    }
  });

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentUserLoading,
        currentUserQuery,
        currentUserData,
        currentUserDataLoading,
        isLoggedIn,
      }}
    >
      {currentUserLoading ? (
        <></>
      ) : (
        <Router>
          {isLoggedIn == true ? (
            <Switch>
              {/* <Route exact path="/signup" component={SignUp} /> */}
              {/* <Route exact path="/signin" component={SignIn} /> */}
              <Route exact path="/user" component={Userpage} />
              <Route exact path="/create" component={CreateListing} />
              <Route path="/" component={Homepage} />
            </Switch>
          ) : (
            // <Redirect to="/signin" />
            <Route path="/" component={SignIn} />
          )}
        </Router>
      )}
    </UserContext.Provider>
  );
}

export default App;
