import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";




import Header from './components/Header';

import Home from './screens/Home';
import Create from './screens/Create';
import Market from './screens/Market';



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
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
