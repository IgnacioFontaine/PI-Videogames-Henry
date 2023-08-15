import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./Components/Landing/LandingPage";
import Home from "./Components/Home/homePage";
import Detail from "./Components/Detail/detailPage";
import Form from "./Components/Form/formPage";
import Error from "./Components/Error/errorPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>

        <Route path="/home" component={Home}></Route>

        <Route path="/detail/:id" component={Detail}></Route>

        <Route path="/form" component={Form}></Route>

        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
