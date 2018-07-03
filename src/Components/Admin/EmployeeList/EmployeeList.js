import React, { Component } from 'react'
import axios from 'axios'
import Employee from './Employee'
import './EmployeeList.css'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'

export default class EmployeeList extends Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }
    componentDidMount() {
        axios.get('/employees').then(res => {
            this.setState({employees:res.data})
        })
    }

    render() {
    return (
      <div className='employeeList' >
            <div className="header">
                <div className="empPic">Photo</div>    
                <div className="empid2">ID</div>
                <div className="empName2">Name</div>
                <div className="empEmail2">Email</div>
                </div>
            {
                this.state.employees.map((val, i) => {
                    return (
                        <Employee key={i} employee={val}/>
                    )
                })
            }    
      </div>
    )
  }
}
