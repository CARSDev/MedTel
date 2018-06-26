import React, { Component } from 'react';
import './App.css';
import PatientList from './Components/PatientList/PatientList';

class App extends Component {
  render() {
    return (
      <div className="App">
        It's MEDTEL!!!
        <PatientList/>
      </div>
    );
  }
}

export default App;
