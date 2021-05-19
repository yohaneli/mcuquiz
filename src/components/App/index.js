import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import '../../App.css';
import Header from '../Header';
import Footer from '../Footer';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import Login from '../Login';
import Welcome from '../Welcome';
import Landing from '../Landing';




function App() {
  return (
      <Router>
        <Header/>

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={ErrorPage} />
        </Switch>

        <Footer/>
      </Router>
  );
}

export default App;
