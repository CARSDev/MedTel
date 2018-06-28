
import React, { Component } from 'react'
import PatientInfo from './PatientInfo/PatientInfo'
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
          
        </div>
        
      </div>
    )
  }
}
