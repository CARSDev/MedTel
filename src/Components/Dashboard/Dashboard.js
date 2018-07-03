import React, { Component } from 'react'
import PatientInfo from './PatientInfo/PatientInfo'
import Results from './Results/Results';
import Allergies from './Allergies/Allergies';
import Conditions from './Conditions/Conditions';
import Visits from './Visits/Visits'
import './Dashboard.css';

export default class Dashboard extends Component {
  constructor() {
    super()

    this.state = {
      patient_id: null
    }
  }

  componentDidMount() {
    this.setUser();
  }

  setUser = () => {
    this.setState({
      patient_id: Number(this.props.match.params.id)
    })
  }
  
  render() {
    return (
      <div className = "dashboard">
        
        <div className="dashboardLeftColumn">
          <PatientInfo patient_id={this.state.patient_id} />
          <Results />
        </div>
        
        <div className="dashboardRightColumn">
          <Visits patient_id={this.state.patient_id}/>
          <Conditions patient_id={this.state.patient_id} />
          <Allergies patient_id={this.state.patient_id}/>
        </div>
     
        

      </div>
    )
  }
}
