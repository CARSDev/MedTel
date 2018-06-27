import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import './Nav.css'

class Nav extends Component {
  constructor(){
  super()
  this.state = {
    showEmployees: false,
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

toggleNav(){
  this.setState({
    showEmployees: !this.state.showEmployees
  })
}

  render() {
    console.log(this.state)
    return (
      <div className='mainNav'>
        <div className="leftNav">
          <img className='logo' src="https://static1.squarespace.com/static/59ca534059cc68a3cdb78cbb/t/59ccbd7837c58187d283b471/1518603415416/" alt=""/>
          <button onClick={() => this.toggleNav()}>toggle</button>
        </div>
        {
          this.state.showEmployees ? 
            <div className="centerNav">
              <div className="vr"></div>
              <p className='centerBs'>Schedule</p>
              <div className="vr"></div>
              <p className='centerBs'>Patients</p>
              <div className="vr"></div>
              <p className='centerBs'>Employees</p>
              <div className="vr"></div>
            </div>
          :     
            <div className="centerNav">
              <div className="vr"></div>
              <p className='centerBs'>Schedule</p>
              <div className="vr"></div>
              <p className='centerBs'>Patients</p> 
              <div className="vr"></div>  
            </div>       
        }
        <div className="rightNav">
          <img className='profImg'src={this.state.employee_picture}alt=""/>
          <p>{this.state.employee_full_name}</p>
          <div className="arrowDown"></div>
        </div>
      </div>
    )
  }
}


export default Nav