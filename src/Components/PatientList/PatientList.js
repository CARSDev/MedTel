import React, { Component } from 'react';
import axios from 'axios';
import Link from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PatientList.css';

export default class PatientList extends Component {
    constructor() {
        super()
        this.state = {
            patients: [],
            search: '',
            criteria: 'all'
        }
        this.filterHandler = this.filterHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
    }

    componentDidMount() {
        axios.get('/patients').then(res => {
            // console.log(res.data)
            this.setState({
                patients: res.data
            })
            toast.success("Successfully got Instruments", { position: toast.POSITION.BOTTOM_RIGHT })
        })
            .catch(() => toast.error("Failed to Fetch Patient List", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    filterHandler(filter) {
        this.setState({
            search: filter
        })
    }

    selectHandler(value) {
        this.setState({
            criteria: value
        })
    }

    render() {
        let patients = this.state.patients.filter((el, i) => {
            switch (this.state.criteria) {
                // case 'all':
                //     if (el === null) {
                //         return false;
                //     }
                //     if (el.includes(this.state.search)) {
                //         return true;
                //     } else {
                //         return false;
                //     }
                //     break;
                case 'patient_id':
                    if (el.patient_id.includes(this.state.search)) {
                        // console.log(el.patient_id)
                        return true;
                    }
                    else {
                        return false;
                    }
                    break;
                case 'patient_full_name':
                    if (el.patient_full_name.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'patient_phone_number':
                    if (el.patient_phone_number.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'patient_email':
                    if (el.patient_email.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                default:
                    return true;
            }
        }).map((el, i) => {
            return (
                <div key={el.patient_id} className="patientsList">
                    <ul>
                        <li><p>{el.patient_id}</p><br />
                            <p>{el.patient_full_name}</p><br />
                            <p>{el.patient_phone_number}</p><br />
                            <p>{el.patient_email}</p><br />
                        </li>
                    </ul>
                </div>

            )
        })
        return (
            <div>
                <ToastContainer />
                <div className="searchBar">
                    <select onChange={(e) => this.selectHandler(e.target.value)} name='searchCriteria'>
                        {/* <option value='all'>All</option> */}
                        <option value='patient_id'>Patient Id</option>
                        <option value='patient_full_name'>Name</option>
                        <option value='patient_phone_number'>Phone</option>
                        <option value='patient_email'>Email</option>
                    </select>
                    <input onChange={(e) => this.filterHandler(e.target.value)}
                        type='search'
                        placeholder='Search...' />
                </div>
                <div className="list">
                    {this.state.search}
                    <div className="listHeaders">
                        <p>Patient Id</p>
                        <p>Name</p>
                        <p>Phone</p>
                        <p>Email</p>
                    </div>
                    <div>
                        {patients}
                    </div>    
                </div>
            </div>
        )
    }
}