import { useAuthState } from "react-firebase-hooks/auth";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { UserContext } from "./Global/UserContext";
import { auth } from "./Firebase";
import Homepage from "./Homepage/Homepage";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Userpage from "./UserPage/Userpage";
import CreateListing from "./CreateListing/CreateListing";
import ListingPage from "./ListingPage/ListingPage";

function App() {
  const [currentUser, currentUserLoading] = useAuthState(auth);

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={{ currentUser, currentUserLoading }}>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/user" component={Userpage} />
          <Route exact path="/create" component={CreateListing} />
          <Route exact path="/listing" component={ListingPage} />
          <Route exact path="/" component={Homepage} />
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
