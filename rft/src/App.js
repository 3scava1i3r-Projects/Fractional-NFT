import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ethers } from "ethers";




import Header from './components/Header';
import Home from './screens/Home';
import Create from './screens/Create';
import Market from './screens/Market';
import NFTsaleScreen from './components/NFTsaleScreen';


/* let provider;


window.ethereum
  .enable()
  .then((provider = new ethers.providers.Web3Provider(window.ethereum)));

const fetcher = ["ethers", { ethers, provider: provider }]; */



function App() {
  
  return (
    
      <Router>
        <div className="App">
          <Switch>
            <Route path="/market">
              <Header />
              <Market />
            </Route>

            <Route path="/create">
              <Header />
              <Create />
            </Route>
            <Route path="/:id" exact>
              <Header />
              <NFTsaleScreen />
            </Route>
            <Route path="/" exact>
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    
  );
}

export default App;
