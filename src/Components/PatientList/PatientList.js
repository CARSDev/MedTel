import React, { Component } from 'react';
import axios from 'axios';
import AddPatient from './AddPatient';
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import Search from '@material-ui/icons/Search'
import './PatientList.css';
import Patient from './Patient'

export default class PatientList extends Component {
    constructor() {
        super()
        this.state = {
            patients: [],
            search: '',
            open: false,
            searchable: false
        }
        this.filterHandler = this.filterHandler.bind(this);
    }

    componentDidMount() {
        this.getPatients()
    }

    getPatients = () => {
        axios.get('/patients').then(res => {
            this.setState({
                patients: res.data
            })
        })
    }

    filterHandler(filter) {
        this.setState({
            search: filter.toLowerCase()
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    allowSearch = () => {
        this.setState({ searchable: !this.state.searchable })
    }

    render() {
        let { search, patients } = this.state

        return (
            <div>
                <Button
                    variant="fab"
                    color="secondary"
                    style={{
                        position: "fixed",
                        bottom: 10,
                        left: 10
                    }}
                    onClick={this.handleClickOpen}
                >
                    <Add />
                </Button>
                <AddPatient open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} outsideCallback={this.getPatients} />

                <div className='patientList' >
                    <div className={this.state.searchable ? "ptSearch" : "ptSearch hidden"}  >
                        <input onChange={(e) => this.filterHandler(e.target.value)}
                            type='search'
                            placeholder='Search...'
                        />
                    </div>
                    <div className="ptHeader">
                        <Search style={{
                            position: 'absolute',
                            marginTop: 15,
                            marginLeft: 10
                        }} onClick={this.allowSearch} />
                        <p>Id</p>
                        <p>Name</p>
                        <p>Phone</p>
                        <p>Email</p>
                        {/* </div> */}
                    </div>
                    <div className= 'patientsList'>
                    {patients.map((val, i) => {
                        if (val.patient_id.toString().includes(search) || val.patient_full_name.toLowerCase().includes(search) || val.patient_phone_number.includes(search) || val.patient_email.toLowerCase().includes(search)) {
                            return (
                                <Patient key={i} val={val}  />
                            )
                        }
                    })}
                    </div>
                </div>

            </div>

        )
    }
}