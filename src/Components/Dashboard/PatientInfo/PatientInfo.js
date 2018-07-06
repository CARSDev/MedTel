import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import ExpandMore from
  "@material-ui/icons/ExpandMore";
import AccountBox from
  "@material-ui/icons/AccountBox";
import Group from
  "@material-ui/icons/Group";
import Domain from
  "@material-ui/icons/Domain";
import Edit from "@material-ui/icons/Edit";
import EditInfo from "./EditInfo";
import "./PatientInfo.css";

class PatientInfo extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      patient_first_name: "",
      patient_last_name: "",
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
      measurementResults: [],
      toggle: false,
      open: false
    };
  }

  componentDidMount() {
    this.getPatient();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(
        {
          id: this.props.patient_id
        },
        () => {
          this.getPatient();
          this.getMeasurements();
          this.getAppts();
        }
      );
    }
  }

  getPatient() {
    let { id } = this.state;
    // let id = 1;
    axios.get(`/patient/${id}`).then(res => {
      let {
        patient_first_name,
        patient_last_name,
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
        patient_first_name,
        patient_last_name,
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
  }

  getMeasurements() {
    let { id } = this.state;
    axios.get(`/patient/measurements/${id}`).then(res => {
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
    let { id } = this.state;
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
    let result = Math.round(bmi * 10) / 10;
    return result;
  }

  toggleFn() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  inputHandler = (e, property) => {
    this.setState({
      [property]: e.target.value
    });
  };

  editPatient = () => {
    // let birthday = moment.utc(this.state.birthday).format();
    let id = this.props.patient_id;
    let {
      patient_first_name,
      patient_last_name,
      patient_birthday,
      patient_gender,
      patient_height,
      patient_weight,
      patient_address,
      patient_phone_number,
      patient_email,
      patient_emergency_contact_name,
      patient_emergency_contact_relationship,
      patient_emergency_contact_number,
      patient_emergency_contact_name2,
      patient_emergency_contact_relationship2,
      patient_emergency_contact_number2
    } = this.state;
    let info = {
      patient_first_name,
      patient_last_name,
      patient_birthday,
      patient_gender,
      patient_height,
      patient_weight,
      patient_address,
      patient_phone_number,
      patient_email,
      patient_emergency_contact_name,
      patient_emergency_contact_relationship,
      patient_emergency_contact_number,
      patient_emergency_contact_name2,
      patient_emergency_contact_relationship2,
      patient_emergency_contact_number2
    };
    // console.log('gender', patient_gender)
    axios.put(`/patient/${id}`, info).then(() => {
      this.resetState();
      // this.getPatient();
      // this.getMeasurements();
      this.handleClose();
    });
  };

  resetState = () => {
    this.setState({
      firstName: "",
      lastName: "",
      birthday: null,
      gender: "",
      height: null,
      weight: null,
      address: "",
      phone: "",
      email: "",
      emergencyName: "",
      emergencyNumber: "",
      emergencyRelationship: "",
      emergencyName2: "",
      emergencyNumber2: "",
      emergencyRelationship2: ""
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateChange = date => {
    this.setState({ patient_birthday: date });
  };

  render() {
    // console.log('state',this.state.patient_gender);
    let {
      patient_first_name,
      patient_last_name,
      patient_gender,
      patient_height,
      patient_weight,
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
    } = this.state;
    return (
      <div className="mainPatientInfo">
        <div className="row1">
          <div className="ptpic">
            <img src={this.state.patient_picture} alt="" />
          </div>
          <div className="row1right">
            <div className="name">
              <h3>{`${patient_first_name} ${patient_last_name}`}</h3>
              <div className="editB">
                <Edit
                  onClick={() => {
                    this.handleClickOpen();
                  }}
                  style={{
                    color: "#5A5A5A"
                  }}
                />
                <EditInfo
                  open={this.state.open}
                  handleClickOpen={this.handleClickOpen}
                  handleClose={this.handleClose}
                  firstName={patient_first_name}
                  lastName={patient_last_name}
                  gender={patient_gender}
                  height={patient_height}
                  weight={patient_weight}
                  address={patient_address}
                  phone={patient_phone_number}
                  email={patient_email}
                  contact1Name={patient_emergency_contact_name}
                  contact1Number={patient_emergency_contact_number}
                  contact1Relationship={patient_emergency_contact_relationship}
                  contact2Name={patient_emergency_contact_name2}
                  contact2Number={patient_emergency_contact_number2}
                  contact2Relationship={patient_emergency_contact_relationship2}
                  birthday={patient_birthday}
                  inputHandler={this.inputHandler}
                  editPatient={this.editPatient}
                  handleDateChange={this.handleDateChange}
                />
              </div>
            </div>
            <div className="row1info">
              <div className="identifiers">
                <div className="age">
                  Age:{" "}
                  {moment().diff(
                    moment(this.state.patient_birthday, "YYYYMMDD"),
                    "years"
                  )} y
                </div>
                <div className="birthdate">
                  DOB:{" "}
                  {moment(this.state.patient_birthday).format("MM/DD/YYYY")}{" "}
                </div>
                <div className="gender">
                  Gender: {patient_gender === 1 ? "Male" : "Female"}
                </div>
              </div>
              <div className="measurements">
                <div className="height">
                  Height: {this.state.patient_height}in
                </div>
                <div className="weight">
                  Weight: {this.state.patient_weight}lbs
                </div>
                <div className="bmi">
                  BMI:{" "}
                  {this.calculateBMI(
                    this.state.patient_height,
                    this.state.patient_weight
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className="iconWrapper">
              <div className="arrowUp">
                <ExpandMore
                  style={{
                    color: "#5A5A5A"
                  }}
                  className={!this.state.toggle ? "arrowUp" : ""}
                  onClick={() => {
                    this.toggleFn();
                  }}
                />
              </div>
            </div>
        <div className="hiddenTabWrapper">
          <div className={this.state.toggle ? "hiddenTab" : "hidden"}>
            <hr />
            <div className="row2">
              <div className="ptHeaders">CONTACT INFO</div>
              <hr />
              <div className="contactInfo">
                <div className="ptinfoicon">
                  <Domain style={{height: 40, width: 40, color: 'EF652F'}}/>
                </div> 
                <div className="contact 1">
                  Address: <br /> {this.state.patient_address} <br />
                </div>
                <div className="contact 2">
                  Phone: {this.state.patient_phone_number} <br />
                  Email: {this.state.patient_email}
                </div>
              </div>
            </div>
            <hr />
            <div className="emergencycontacts">
              <div className='ptHeaders'>EMERGENCY CONTACTS</div>
              <hr />
              <div className="contacts">
                <div className="ptinfoicon">
                  <Group style={{height: 40, width: 40, color: '#3e8ec7'}}/>
                </div>  
                <div className="contact 1">
                    {patient_emergency_contact_name} -  {patient_emergency_contact_relationship}<br />
                    {patient_emergency_contact_number} <br />
                </div>
                {this.state.patient_emergency_contact_name2 ? (
                  <div className="contact 2">
                    {patient_emergency_contact_name2} - {patient_emergency_contact_relationship2} <br />
                    {patient_emergency_contact_number2} <br />
                    
                  </div>
                ) : (
                  <div className="contact 2">
                    <p>Not Listed</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientInfo;
