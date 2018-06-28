import React, { Component } from 'react'
import PatientInfo from './PatientInfo/PatientInfo'
import Results from './Results/Results';
import Conditions from './Conditions/Conditions';
import './Dashboard.css';

export default class Dashboard extends Component {
  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className = "dashboard">
        
        <div className="dashboardLeftColumn">
          <PatientInfo />
        </div>
        
        <div className="dashboardRightColumn">
          <PatientInfo />
        </div>
        <Results />
      
        

      </div>
    )
  }
}
