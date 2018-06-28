import React, { Component } from "react";
import axios from "axios";
import "./PatientInfo.css";

class PatientInfo extends Component {
  constructor() {
    super();
    this.state = {
      patient_full_name: "",
      patient_picture: "",
      patient_age: null,
      patient_birthday: null,
      patient_gender: null,
      patient_height: null,
      patient_weight: null,
      patient_bmi: null,
      patient_address: "",
      patient_phone_number: null,
      patient_email: "",
      patient_emergency_contact_name: "",
      patient_emergency_contact_relationship: "",
      patient_emergency_contact_number: null,
      patient_emergency_contact_name2: "",
      patient_emergency_contact_relationship2: "",
      patient_emergency_contact_number2: null,
      upcoming_appt1: "",
      upcoming_appt2: "",
      measurementResults: []
    };
  }

  componentDidMount() {
    // let { id } = this.props.patient_id
    let id = 1;
    axios.get(`/patient/${id}`).then(res => {
      let {
        patient_full_name,
        patient_picture,
        patient_gender,
        patient_address,
        patient_birthday,
        patient_phone_number,
        patient_email,
        patient_emergency_contact_name,
        patient_emergency_contact_relationship,
        patient_emergency_contact_number,
        patient_emergency_contact_name2,
        patient_emergency_contact_relationship2,
        patient_emergency_contact_number2
      } = res.data[0];
      this.setState({
        patient_full_name,
        patient_picture,
        patient_gender,
        patient_address,
        patient_phone_number,
        patient_birthday,
        patient_email,
        patient_emergency_contact_name,
        patient_emergency_contact_relationship,
        patient_emergency_contact_number,
        patient_emergency_contact_name2,
        patient_emergency_contact_relationship2,
        patient_emergency_contact_number2
      });
    });
    axios.get(`/patient/measurements/${id}`).then(res => {
      console.log(res.data, "measurements");
      this.setState({
        measurementResults: res.data
      });
    });
  }

  render() {
    console.log(this.state);
    let heightTest = this.state.measurementResults.find(result => {
      return result.test_name === "height in inches";
    }) || {};
    let height = heightTest.lab_result;
    let weightTest = this.state.measurementResults.find(result => {
      return result.test_name === 'weight in pounds';
    }) || {};
    let weight = weightTest.lab_result;
    console.log(height);
    return (
      <div className="mainPatientInfo">
        <div className="row1">
          <div className="ptpic">
            <img src={this.state.patient_picture} alt=""/>
          </div>
          <div className="identifiers">
            <div className="name"><h3>{this.state.patient_full_name}</h3></div>
            <div className="birthdate">Birthdate:{this.state.patient_birthday}</div>
            <div className="gender">{this.state.patient_gender}</div>
          </div>
          <div className="measurements">
            <div className="height">Height: {height}</div>
            <div className="weight">Weight: {weight}</div>
          </div>
        </div>
        <hr />
        <div className="row2">
          <div className="address" >
          
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
    );
  }
}

export default PatientInfo;
