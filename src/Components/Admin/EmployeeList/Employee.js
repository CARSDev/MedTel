import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './Employee.css'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import EditEmployee from '../EditEmployee/EditEmployee'

class Employee extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
    delete = () => {
        let id = this.props.employee.employee_id
        if (window.confirm('Are you sure you want to delete this condition?')) {
            axios.delete(`/employee/${id}`).then(this.props.history.go(0))
        }
    }

    render() {
        const { employee } = this.props
        return (
            <div className='employee' >
                <div className='icons' >
                    <Edit style={{
                        color: '#5A5A5A'
                    }} onClick={this.handleClickOpen} />
                    <Delete style={{
                        color: '#5A5A5A'
                    }} onClick={this.delete} />
                </div>
                <div className="tableCell"><img className="empPic2" src={employee.employee_picture ? employee.employee_picture : 'http://www.navchetanhospital.com/wp-content/uploads/2015/02/noprofile.gif'} alt="" /></div>
                <div className="tableCell"><h3 className="empid">{employee.employee_id}</h3></div>
                <div className="tableCell"><h3 className="empName">{employee.employee_full_name}</h3></div>
                <div className="tableCell"><a href={`mailto:${employee.employee_email}`}><h3 className="empEmail">{employee.employee_email}</h3></a></div>
                <EditEmployee open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} employee={employee}/>
            </div>
        )
    }
}

export default withRouter(Employee)