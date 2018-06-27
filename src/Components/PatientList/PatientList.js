import React, { Component } from 'react';
import axios from 'axios';
// import Link from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class PatientList extends Component {
    constructor() {
        super()
        this.state = {
            patients: [],
            search: '',
            criteria: 'all'
        }
    }

    componentDidMount() {
        axios.get('/patients').then(res => {
            this.setState({
                patients: res.data
            })
            toast.success("Successfully got Instruments", { position: toast.POSITION.TOP_CENTER })
        }).catch(() => toast.error("Failed to Fetch Patient List"))
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
                case 'all':
                    if (el === null) {
                        return false;
                    }
                    if (el.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'Patient_id':
                    if (el.patient_id.includes(this.state.search)) {
                        return true;
                    }
                    break;
                case 'Patient_full_name':
                    if (el.patient_full_name.includes(this.state.search)) {
                        return true;
                    }
                    break;
                case 'Patient_phone_number':
                    if (el.patient_phone_number.includes(this.state.search)) {
                        return true;
                    }
                    break;
                case 'Patient_email':
                    if (el.patient_email.includes(this.state.search)) {
                        return true;
                    }
                    break;
                default:
                    return true;
            }
        }).map(el => {
            return (
                <div key={el.patient_id}>
                    <ul>
                        <li><p>Patient Id {el.patient_id}</p><br />
                            <p>Name: {el.patient_full_name}</p><br />
                            <p>Phone: {el.patient_phone_number}</p><br />
                            <p>Email: {el.patient_email}</p><br />
                        </li>
                    </ul>
                </div>

            )
        })
        return (
            <div>
                <ToastContainer />
                <div>
                    <select onChange={(e) => this.selectHandler(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='patient_id'>Patient Id</option>
                        <option value='patient_phone_number'>Phone</option>
                        <option value='patient_email'>Email</option>
                    </select>
                    <input onChange={(e) => this.filterHandler(e.target.value)}
                        type='search'
                        placeholder='Search...' />
                </div>
                <div>
                    {patients}
                </div>
            </div>
        )
    }
}