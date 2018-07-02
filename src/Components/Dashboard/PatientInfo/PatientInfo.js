import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import "./PatientInfo.css";

class PatientInfo extends Component {
  constructor() {
    super();
    this.state = {
      id: 1,
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
      upcoming_appt1: {
        employee_full_name: null,
        patient_visit_date: null,
        visit_type_name: null,
        patient_visit_reason: null
      },
      upcoming_appt2: {
        employee_full_name: null,
        patient_visit_date: null,
        visit_type_name: null,
        patient_visit_reason: null
      },
      measurementResults: []
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.patient_id || 1
    }, () => {
      this.getPatient();
      this.getMeasurements();
      this.getAppts();
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        id: this.props.patient_id
      }, () => {
        this.getPatient();
        this.getMeasurements();
        this.getAppts();
      })
    }
  }

  getPatient() {
    let { id } = this.state
    // let id = 1;
    axios.get(`/patient/${id}`).then(res => {
      let {
        patient_full_name,
        patient_picture,
        gender_name,
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
        patient_gender: gender_name,
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
  }

  getMeasurements() {
    let { id } = this.state
    // let id = 1;
    axios.get(`/patient/measurements/${id}`).then(res => {
      // console.log(res.data, "measurements");
      let heightTest =
        res.data.find(result => {
          return result.test_name === "height in inches";
        }) || {};
      let height = heightTest.lab_result;
      let weightTest =
        res.data.find(result => {
          return result.test_name === "weight in pounds";
        }) || {};
      let weight = weightTest.lab_result;
      this.setState({
        patient_height: height,
        patient_weight: weight
      });
    });
  }

  getAppts() {
    let { id } = this.state
    // let id = 1;
    let today = moment.utc(new Date()).format();
    axios.get(`/visit/${id}/${today}`).then(res => {
      // console.log(res.data, 'visits')
      if (res.data[0]) {
        var appt1 = { ...this.state.upcoming_appt1 };
        appt1.employee_full_name = res.data[0].employee_full_name;
        appt1.patient_visit_date = res.data[0].patient_visit_date;
        appt1.visit_type_name = res.data[0].visit_type_name;
        appt1.patient_visit_reason = res.data[0].patient_visit_reason;
      }
      if (res.data[1]) {
        var appt2 = { ...this.state.upcoming_appt2 };
        appt2.employee_full_name = res.data[1].employee_full_name;
        appt2.patient_visit_date = res.data[1].patient_visit_date;
        appt2.visit_type_name = res.data[1].visit_type_name;
        appt2.patient_visit_reason = res.data[1].patient_visit_reason;
      }
      this.setState({
        upcoming_appt1: appt1,
        upcoming_appt2: appt2
      });
    });
  }

  calculateBMI(height, weight) {
    let bmi = (weight / (height * height)) * 703;
    let result = Math.round(bmi * 10) / 10
    return result
  }

  render() {
    console.log(this.state)
    return (
      <div className="mainPatientInfo">
        <div className="row1">
          <div className="ptpic">
            <img src={this.state.patient_picture} alt="" />
          </div>
          <div className="identifiers">
            <div className="name">
              <h3>{this.state.patient_full_name}</h3>
            </div>
            <div className="birthdate">
              Birthdate: {this.state.patient_birthday}
            </div>
            <div className="gender">Gender: {this.state.patient_gender}</div>
          </div>
          <div className="measurements">
            <div className="height">Height: {this.state.patient_height}</div>
            <div className="weight">Weight: {this.state.patient_weight}</div>
            <div className="bmi">BMI: {this.calculateBMI(this.state.patient_height, this.state.patient_weight)}</div>
          </div>
        </div>
        <hr />
        <div className="row2">
          <div className="address">
            Address: {this.state.patient_address} <br />
            Phone: {this.state.patient_phone_number} <br />
            Email: {this.state.patient_email}
          </div>
          <div className="appts">
            Upcoming Appointments: <br />
            {this.state.upcoming_appt1 ? (
              <div>
                {this.state.upcoming_appt1.employee_full_name}
                {moment(this.state.upcoming_appt1.patient_visit_date).format(
                  "YYYY-MM-DD H:mm A"
                )}{" "}
                <br /> {this.state.upcoming_appt1.patient_visit_reason}{" "}
              </div>
            ) : (
              "None"
            )}
            <hr />
            {this.state.upcoming_appt2 ? (
              <div>
                {this.state.upcoming_appt2.employee_full_name}
                {moment(this.state.upcoming_appt2.patient_visit_date).format(
                  "YYYY-MM-DD H:mm A"
                )}{" "}
                <br /> {this.state.upcoming_appt2.patient_visit_reason}{" "}
              </div>
            ) : (
              "None"
            )}
          </div>
        </div>
        <div className="row3">
          <div className="contact1" />
          <div className="contact2" />
        </div>
      </div>
    );
  }
}

export default PatientInfo;
