import React, { Component } from 'react'
import './PatientInfo.css'

class PatientInfo extends Component {
  constructor() {
    super()
    this.state = {
      full_name: '',
      picture: '',
      age: null,
      gender: null,
      height: null,
      weight: null,
      bmi: null,
      address: '',
      phone_number: null,
      email: '',
      emergency_contact_name: '',
      emergency_contact_relationship: '',
      emergency_contact_number: null,
      emergency_contact_name2: '',
      emergency_contact_relationship: '',
      emergency_contact_number2: null,
      upcoming_appt1: '',
      upcoming_appt2: ''
    }
  }



  render() {
    return (
      <div className='mainPatientInfo'>
        <div className="row1">
          <div className="ptpic">
            
          </div>
          <div className="identifiers">
          
          </div>
          <div className="measurements">
          
          </div>
        </div>
        <div className="row2">
          <div className="address">
          
          </div>
          <div className="contacts">
          
          </div>
        </div>
        <div className="row3">
          <div className="appt1">
          
          </div>
          <div className="appt2">
          
          </div>
        </div>
      </div>
    )
  }
}


export default PatientInfo