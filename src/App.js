import React, { Component } from 'react';
//Components
import Nav from './Components/Nav/Nav'
import Login from './Components/Login/Login'
import './reset.css'
import './App.css';
import routes from './routes'
import { withRouter } from "react-router-dom";



class App extends Component {
  render() {
    return (

      (this.props.location.pathname === '/') ? 
      
        <div className="App">
          <Login/>  
        </div>
        
      :
        
        <div className="App">
          <Nav />
          {routes}
        </div>
      
    );
  }
}

export default withRouter(App);
