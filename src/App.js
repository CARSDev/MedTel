import React, { Component } from 'react';
import './reset.css'
import './App.css';
import Schedule from './Components/Schedule/Schedule'


class App extends Component {
  render() {
    return (
      <div className="App">
        It's MEDTEL!!!
          <Schedule />
      </div>
    );
  }
}

export default App;
