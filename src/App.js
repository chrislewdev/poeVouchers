import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { UserContext } from "./Global/UserContext";
import { auth } from "./Firebase";
import Homepage from "./Homepage/Homepage";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Userpage from "./UserPage/Userpage";
import CreateListing from "./CreateListing/CreateListing";
import { useEffect, useState } from "react";
import { db } from "./Firebase";
import HowToPage from "./HowToPage/HowToPage";

function App() {
  const [currentUser, currentUserLoading] = useAuthState(auth);

  const [currentUserQuery, setCurrentUserQuery] = useState(null);

  const [currentUserData, currentUserDataLoading] = useCollectionData(
    currentUserQuery
  );

  useEffect(() => {
    if (currentUser != null) {
      const userQuery = db
        .collection("users")
        .where("userUID", "==", currentUser.uid);

      setCurrentUserQuery(userQuery);
    }
  }, [currentUserLoading, currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentUserLoading,
        currentUserQuery,
        currentUserData,
        currentUserDataLoading,
      }}
    >
      {currentUserLoading ? (
        <></>
      ) : (
        <Router>
          {currentUser ? (
            <Switch>
              <Route exact path="/user" component={Userpage} />
              <Route exact path="/howto" component={HowToPage} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/create" component={CreateListing} />
              <Route path="/" component={Homepage} />
            </Switch>
          ) : (
            <Route path="/" component={SignIn} />
          )}
        </Router>
      )}
    </UserContext.Provider>
  );
}

export default App;
