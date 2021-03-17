import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Userpage from "./UserPage/Userpage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/user" component={Userpage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
