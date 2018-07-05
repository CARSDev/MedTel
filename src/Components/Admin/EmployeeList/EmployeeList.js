import React, { Component } from 'react'
import axios from 'axios'
import Employee from './Employee'
import './EmployeeList.css'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Search from '@material-ui/icons/Search'


export default class EmployeeList extends Component {
    constructor() {
        super()
        this.state = {
            employees: [],
            searchable: false,
            search: ''
        }
    }
    componentDidMount() {
        this.getEmployees()
    }
    
    getEmployees = () => {
        axios.get('/employees').then(res => {
            this.setState({ employees: res.data })
        })
    }

    filterHandler(searchString) {
        this.setState({
            search: searchString.toLowerCase()
        })
    }

    allowSearch =()=> {
        this.setState({searchable:!this.state.searchable})
    }

    render() {
        const { employees, search } = this.state
        return (
            <div className='employeeList' >
                <div className={this.state.searchable ? "empSearch" : " empSearch hidden"}>
                    <input onChange={(e) => this.filterHandler(e.target.value)}
                        type='search'
                        placeholder='Search...' />
                </div>
                <div className="header">
                    <Search style={{
                        position: 'absolute',
                        marginTop: 15,
                        marginLeft: 20
                    }}  onClick={this.allowSearch} />
                    <div className="empPic">Photo</div>
                    <div className="empid2">ID</div>
                    <div className="empName2">Name
                </div>
                    <div className="empEmail2">Email</div>
                </div>
                {
                    employees.map((val, i) => {
                        if (val.employee_id.toString().includes(search) || val.employee_full_name.toLowerCase().includes(search)) {
                            return (
                                <Employee key={i} employee={val} />
                            )
                        }
                    })
                }
            </div>
        )
    }
}
