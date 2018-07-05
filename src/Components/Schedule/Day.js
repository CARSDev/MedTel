import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'
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
import Edit from '@material-ui/icons/Edit'
import Add from '@material-ui/icons/Add'


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Day extends Component {
    constructor() {
        super()
        this.state = {
            times: [],
            patients: [{ message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: 'Add Appointment' },],
            open: false, 
            openEdit: false, 
            openReason: false,
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
            this.setState({
                patients: [{ message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: '+' }, { message: 'Add Appointment' },],
})
        }
    }

    handleClickOpen = (time) => {
        this.setState({ open: true, selectedTime: time });
        console.log(time)
    };

    handleClickOpenEdit = (val) => {
        console.log(val.visitId)
        this.setState({openEdit:true, selectedID: val.visitId})
    }

    handleClickOpenReason = () => {
        this.setState({openReason: true})
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseEdit = () => {
        this.setState({openEdit:false})
    }

    handleCloseReason = () => {
        this.setState({openReason: false})
    }
    
    getName = (name) => {
        this.setState({selectedID:name})
}

    submit = (time, id, reason) => {
        let utc_time = moment.utc(time).format()
        axios.post('/appointment', { utc_time, id, reason }).then(res => {
            this.handleClose()
        }).then(this.props.getSchedule())
    }

    submitChange = (id, reason) => {
        console.log(this.state.selectedID)
        axios.put('/appointment', { id, reason }).then(res => {
            this.setState({ openEdit: false, openReason: false })
        }).then(this.props.getSchedule())
    }

    submitDelete = (id) => {
        console.log(id)
        axios.delete(`/appointment/${id}`).then(res => {
            this.setState({ openEdit: false })
        }).then(this.props.getSchedule())
    }

    setReason = (reason) => {
        this.setState({reason})
    }

    // toDashboard = (id) => {
    //     this.props.history.push(`/dashboard/${id}`)
    // }

    render() {
        const { date, morning, schedule } = this.props
        const { times, patients, selectedTime, selectedID, reason } = this.state

        times.map((time, ti) => {
            schedule.map(visit => {
                // console.log(visit)
                if (moment(visit.patient_visit_date)._d.toString() === time.toString()) {
                    patients.splice(ti, 1, { name: visit.patient_full_name, ptID:visit.patient_id ,reason: visit.patient_visit_reason, visitId: visit.patient_visit_id })
                }
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
                                // console.log(val)
                                return (
                                    <div key={i} className='ptAndReason'>
                                        { val.name?
                                            <Edit onClick={
                                                () => this.handleClickOpenEdit(val)}
                                               />
                                            : <Add onClick={()=>this.handleClickOpen(times[i])} />}
                                        {val.name ? 
                                            <Link to={`/dashboard/${val.ptID}`} >
                                                <h3 className='schedName'>{val.name}</h3>    
                                            </Link>
                                            :
                                            <h3 className='schedName' onClick={this.handleClickOpen} ></h3>
                                            // <Add onClick={this.handleClickOpen}/>
                                    }
                                        {/* <h3 className='schedName'
                                            onClick={()=>this.toDashboard(val.visitId)}>{val.name ? val.name : val.message}</h3> */}
                                        <h3 id='schedReason'>{val.reason ? val.reason : null}</h3>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* //schedule */}
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

                {/* edit appointment */}
                <Dialog
                    open={this.state.openEdit}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseEdit}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogActions>
                        <Button onClick={this.handleClickOpenReason} color="primary">
                            Edit Appointment
                        </Button>
                        <Button onClick={() => this.submitDelete(selectedID)} color="primary">
                            Delete Appointment
                        </Button>
                        <Button onClick={this.handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* update reason */}
                <Dialog
                    open={this.state.openReason}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Please enter the reason for the appointment:
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Reason for visit"
                            type="email"
                            fullWidth
                            onChange={e => this.setReason(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseReason} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.submitChange( selectedID, reason)} color="primary">
                            Schedule
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(Day)