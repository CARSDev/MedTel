import React, { Component } from 'react';
import './Day.css'
import axios from 'axios'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
            patients: [{ message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' }, { message: 'Add Appointment' },],
            open: false, 
            selectedTime: '', 
            reason: '',
            selectedID:''
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

    handleClickOpen = (time) => {
        this.setState({ open: true, selectedTime: time });
        console.log(time)
    };

    handleClose = () => {
        console.log('hi')
        this.setState({ open: false });
    };
    
    getName = (name) => {
        this.setState({selectedID:name})
}

    submit = (time, id, reason) => {
        let utc_time = moment.utc(time).format()
        axios.post('/appointment', { utc_time, id, reason }).then(res => {
            console.log('submitted & recorded')
        })
        this.handleClose()
    }

    setReason = (reason) => {
        this.setState({reason})
    }

    render() {
        const { date, morning, schedule } = this.props
        const { times, patients, reasons, selectedTime, selectedID, reason } = this.state

        console.log(schedule)

        times.map((time, ti) => {
            schedule.map(visit => {
                if (moment(visit.patient_visit_date)._d.toString() === time.toString()) {
                    patients.splice(ti, 1, { name: visit.patient_full_name, reason: visit.patient_visit_reason })
                }
            })
        })

        console.log(patients)

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
                                        <h3 className='schedName' onClick={!val.name ?
                                            ()=>this.handleClickOpen(times[i]) : null} >{val.name ? val.name : val.message}</h3>
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
                        <Autocomplete getName={this.getName} />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Reason for visit"
                            type="email"
                            fullWidth 
                            onChange={e=>this.setReason(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>this.submit(selectedTime, selectedID, reason)} color="primary">
                            Schedule
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}