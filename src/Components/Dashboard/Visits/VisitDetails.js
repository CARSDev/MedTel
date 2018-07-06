import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import './Visits.css'

export default class VisitDetails extends Component {
    constructor() {
        super()

        this.state = {
            employee_id: '',
            patient_id: '',
            patient_visit_date: '',
            patient_visit_id: '',
            patient_visit_note: '',
            patient_visit_note_time_recorded: null,
            patient_visit_reason: '',
            visit_type_id: '',
            open: false
        }
    }

    componentDidMount() {
        let { employee_id, patient_id, patient_visit_date, patient_visit_id, patient_visit_note, patient_visit_note_time_recorded, patient_visit_reason, visit_type_id } = this.props.data
        let visit_date = moment(patient_visit_date).format('MM/DD/YYYY');
        
        if (patient_visit_note_time_recorded === null) {
            let date_note_recorded = null
            this.setState({
                patient_visit_note_time_recorded: date_note_recorded
            })
        } else {
            let date_note_recorded  = moment(patient_visit_note_time_recorded)._d.toString()
            this.setState({
                patient_visit_note_time_recorded: date_note_recorded
            })
        }
        this.setState({
            employee_id,
            patient_id,
            patient_visit_date: visit_date,
            patient_visit_id,
            patient_visit_note,
            patient_visit_reason,
            visit_type_id
        })
    }

    updateVisit = () => {
        axios.put(`/api/visits/${this.state.patient_visit_id}`, { patient_visit_reason: this.state.patient_visit_reason, patient_visit_note: this.state.patient_visit_note })
            .then(() => {
                this.props.getPatientInfo()
                this.setState({
                    open: false
                })
            })
    }
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleInput = (e, property) => {
        this.setState({
            [property] : e.target.value
        })
    }

    render() {
        let { data } = this.props
        let date = moment(data.patient_visit_date).format('MM/DD/YYYY')
        // let lastInitial = data.employee_last_name.slice(0, 1);
        // let employeeName = `${data.employee_first_name} ${lastInitial}.`
        let firstInitial = data.employee_first_name.slice(0, 1);
        let employeeName = `${firstInitial}. ${data.employee_last_name}`
    return (
        <div>

            <div className="visitDetails" onClick={this.handleClickOpen}>
                <div className="visitTopRow">
                    <div className="visitDate">{date}</div>
                    <div className="visitEmployee">{employeeName}</div>
                </div>
                
                <div className="visitReason">{data.patient_visit_reason}</div>
            </div>
            
            {/***************** DIALOG CONTENT ******************/}
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >   
                <div className="dialogTitle">
                    
                    <h3>{date}</h3>
                    <h3>Provider: {employeeName}</h3>

                </div>
                
                <h2 className = "dialogSubtitle">Visit Details:</h2>
                
                <DialogContent>
                    
                    <TextField
                        autoFocus
                        margin="normal"
                        id="reason"
                        label="Reason for Visit"
                        type="text"
                        fullWidth
                        value={this.state.patient_visit_reason}
                        onChange = {(e) => this.handleInput(e, 'patient_visit_reason')}
                    />

                    <TextField
                        margin="normal"
                        id="note"
                        multiline
                        rowsMax = '10'
                        label="Note from Visit"
                        type="text"
                        fullWidth
                        value={this.state.patient_visit_note}
                        onChange={(e) => this.handleInput(e, 'patient_visit_note')}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={this.updateVisit} color="primary">
                        Edit
            </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
  }
}


