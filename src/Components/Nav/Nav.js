import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Collapse from "@material-ui/core/Collapse";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
import './Nav.css'

class Nav extends Component {
  constructor(){
  super()
  this.state = {
    showEmployees: false,
    showDropdown: false,
    employee_picture: null,
    employee_full_name: null
  }
}

componentDidMount(){
  axios.get('/employee')
    .then((res) => {
      // console.log(res.data)
      let {employee_picture, employee_full_name} = res.data[0]
      this.setState({
        employee_picture: employee_picture,
        employee_full_name: employee_full_name
      })
    })
}

toggleAdmin(){
  this.setState({
    showEmployees: !this.state.showEmployees
  })
}

toggleDropdown() {
  this.setState({
    showDropdown: !this.state.showDropdown
  })
}  

  render() {
    console.log(this.state)
    return <div className="mainNav">
        <div className="leftNav">
          <img className="logo" src="https://static1.squarespace.com/static/59ca534059cc68a3cdb78cbb/t/59ccbd7837c58187d283b471/1518603415416/" alt="" />
          <button onClick={() => this.toggleAdmin()}>toggle</button>
        </div>
        {this.state.showEmployees ? <div className="centerNav">
            {/* <div className="vr"></div> */}
            <Link to="/dashboard">
              <p className="centerBs">Dashboard</p>
            </Link>
            <div className="vr" />
            <Link to="/schedule">
              <p className="centerBs">Schedule</p>
            </Link>
            <div className="vr" />
            <Link to="/patients">
              <p className="centerBs">Patients</p>
            </Link>
            <div className="vr" />
            <Link to="/admin">
              <p className="centerBs">Admin</p>
            </Link>
            {/* <div className="vr"></div> */}
          </div> : <div className="centerNav">
            {/* <div className="vr"></div> */}
            <Link to="/dashboard">
              <p className="centerBs">Dashboard</p>
            </Link>
            <div className="vr" />
            <Link to="/schedule">
              <p className="centerBs">Schedule</p>
            </Link>
            <div className="vr" />
            <Link to="/patients">
              <p className="centerBs">Patients</p>
            </Link>
            {/* <div className="vr"></div>   */}
          </div>}
        <div className="rightNav">
          <img className="profImg" src={this.state.employee_picture} alt="" />
          <p className="nameDropdown" onClick={() => this.toggleDropdown()}>
            {this.state.employee_full_name}
          </p>
          {!this.state.showDropdown ? null : <div className="menu">
              <p>Logout</p>
            </div>}

          <div className="arrowDown" onClick={() => this.toggleDropdown()} />
        </div>
      </div>;
  }
}


export default Nav