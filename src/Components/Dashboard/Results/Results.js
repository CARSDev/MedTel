import React, { Component } from 'react'
import Labs from './Labs'
import Imaging from './Imaging'
import Reported from './Reported'
import './Results.css'

export default class Results extends Component {
  render() {
    return (
      <div className = "results">
            <Labs patient_id={this.props.patient_id}/>
            <Reported patient_id={this.props.patient_id}/>
            <Imaging patient_id={this.props.patient_id}/>
            
      </div>
    )
  }
}

