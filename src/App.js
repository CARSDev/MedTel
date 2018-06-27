import React, { Component } from 'react';
//Components
import Nav from './Components/Nav/Nav'
import './reset.css'
import './App.css';
import routes from './routes'


class App extends Component {
  render() {
    return (
      <div className="App">
      <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
