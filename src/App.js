import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
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

function App() {
  const [currentUser, currentUserLoading] = useAuthState(auth);

  const [currentUserQuery, setCurrentUserQuery] = useState(null);

  const [currentUserData, dataLoading, dataError] = useCollectionDataOnce(
    currentUserQuery
  );

  useEffect(() => {
    if (currentUser != null) {
      const userQuery = db
        .collection("users")
        .where("userUID", "==", currentUser.uid);

      setCurrentUserQuery(userQuery);
    }
  }, [currentUserLoading]);

  return (
    <Router>
      <Switch>
        <UserContext.Provider
          value={{
            currentUser,
            currentUserLoading,
            currentUserQuery,
            currentUserData,
          }}
        >
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/user" component={Userpage} />
          <Route exact path="/create" component={CreateListing} />
          <Route exact path="/" component={Homepage} />
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
