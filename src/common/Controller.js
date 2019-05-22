import React, { Component } from 'react';
import Home from '../screens/home/Home';
//import Details from '../screens/details/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import BookShow from '../screens/bookshow/BookShow';
//import Confirmation from '../screens/confirmation/Confirmation';

class Controller extends Component {

  constructor() {
    super();
    this.baseUrl = "http://34.201.109.176:8080/api/swagger-ui.html#!/movie-controller/getMoviesUsingGET_1";
  }
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Home {...props}  />} />
          
        </div>
      </Router>
    )
  }
}

export default Controller;
