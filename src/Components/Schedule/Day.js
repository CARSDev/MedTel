import React, { Component } from 'react';
import './Day.css'
import moment from 'moment'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Autocomplete from './Autocomplete'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class Day extends Component {
    constructor() {
        super()
        this.state = {
            times: [],
            patients: ['Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment', 'Add Appointment'],
            open: false,
            search: ''
        }
    }

    createTimes = () => {
        var d = this.props.morning
        var timeStops = [];
        var amTime = moment(d).add(8, 'h')._d
        for (let i = 0; i < 10; i++) {
            timeStops.push(amTime)
            amTime = moment(amTime).add(30, 'm')._d
        }

        var pmTime = moment(d).add(13, 'h')._d
        for (let i = 0; i < 8; i++) {
            timeStops.push(pmTime)
            pmTime = moment(pmTime).add(30, 'm')._d
        }
        this.setState({ times: timeStops })
    }

    componentDidMount() {
        this.createTimes()
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.createTimes()
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    filterHandler = filter => {
        this.setState({search:filter})
    }

    render() {
        const { date, morning, schedule } = this.props
        const { times, patients, reasons } = this.state

        times.map((time, ti) => {
            schedule.map(visit => {
                if (moment(visit.patient_visit_date)._d.toString() === time.toString()) {
                    patients.splice(ti, 1, { name: visit.patient_full_name, reason: visit.patient_visit_reason })
                } else { patients.splice(ti, 1, 'Add Appointment') }
            })
        })

        return (
            <div className='dayList'>
                <div className="namesColumn">
                    <div className='schedHeader'>
                        <h1>Appointment Time</h1>
                        <h1>Patient Name</h1>
                        <h1 id='schedReason'>Reason for Visit</h1>
                    </div>
                    <div className='schedContent'>
                        <div className='schedTimes'>
                            {times.map((val, i) => {
                                return (
                                    <h3 key={i} >{moment(val).format("h:mm A")}</h3>
                                )
                            })}
                        </div>
                        <div className='rightTwo'>
                            {patients.map((val, i) => {
                                return (
                                    <div key={i} className='ptAndReason'>
                                        <h3 className='schedName' onClick={!val.name ? this.handleClickOpen: null} >{val.name ? val.name : 'Add Patient'}</h3>
                                        <h3 id='schedReason'>{val.reason ? val.reason : '-'}</h3>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Please select the patient you wish to schedule: 
                    </DialogTitle>
                    <DialogContent>
                        {/* <input onChange={(e) => this.filterHandler(e.target.value)}
                            type='search'
                            placeholder='Search...' /> */}
                        <Autocomplete />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Reason for visit"
                            type="email"
                            fullWidth
                            
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}