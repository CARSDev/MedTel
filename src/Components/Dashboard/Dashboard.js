
import React, { Component } from 'react'
import PatientInfo from './PatientInfo/PatientInfo'
import Results from './Results/Results';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <PatientInfo />
        <Results/>
      </div>
    )
  }
}
