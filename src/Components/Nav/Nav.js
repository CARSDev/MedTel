import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showAdmin: false,
      showDropdown: false,
      employee_picture: null,
      employee_first_name: null
    };
  }

  componentDidMount() {
    axios.get("/employee").then(res => {
      console.log(res.data[0])
      let { employee_picture, employee_first_name, role_id } = res.data[0];
      if (role_id === 1) {
        this.setState({
          showAdmin: true,
          employee_picture: employee_picture,
          employee_first_name: employee_first_name
        }); 
      } else {
        this.setState({
          employee_picture: employee_picture,
          employee_first_name: employee_first_name
        }); 
      }
      
    });
  }


  // toggleAdmin() {
  //   this.setState({
  //     showAdmin: !this.state.showAdmin
  //   });
  // }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }



  render() {
    // console.log(this.props)
    return <div className="mainNav">
        <div className="leftNav">
          <img className="logo" src="https://static1.squarespace.com/static/59ca534059cc68a3cdb78cbb/t/59ccbd7837c58187d283b471/1518603415416/" alt="" />
          {/* <button onClick={() => this.toggleAdmin()}>toggle</button> */}
        </div>
        <div className="centerNav">
          <Link to="/schedule">
            <p
              className={
                this.props.location.pathname === "/schedule"
                  ? "centerBactive"
                  : "centerB"
              }
            >
              Schedule
            </p>
          </Link>
          <div className="vr" />
          <Link to="/patients">
            <p
              className={
                this.props.location.pathname === "/patients"
                  ? "centerBactive"
                  : "centerB"
              }
            >
              Patients
            </p>
          </Link>
          <div className="vr" />
          {this.state.showAdmin ? <Link to="/admin">
              <p
                className={
                  this.props.location.pathname === "/admin"
                    ? "centerBactive"
                    : "centerB"
                }
              >
                Admin
              </p>
            </Link> : null}
        </div>
        <div className="rightNav">
          <img className="profImg" src={this.state.employee_picture} alt="" />
          <p className="navname">{this.state.employee_first_name}</p>
          <div className="vr" />
          <Link to='/'><p className='centerB'>Logout</p></Link>
        </div>
      </div>;
  }
}

export default withRouter(Nav);
