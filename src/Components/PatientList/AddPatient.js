import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { DatePicker } from 'material-ui-pickers';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import axios from 'axios';
import moment from 'moment';
import './PatientList.css';

export default class AddPatient extends Component {
    constructor() {
        super()

        this.state = {
            firstName: '',
            lastName: '',
            birthday: new Date(),
            gender: '',
            address: '',
            phone: '',
            email: '',
            emergencyName: '',
            emergencyNumber: '',
            emergencyRelationship: ''
        }
    }

    addPatient = () => {
        let birthday = moment.utc(this.state.birthday).format()
        const { firstName, lastName, gender, address, phone, email, emergencyName, emergencyNumber, emergencyRelationship } = this.state
        let info = {
            firstName,
            lastName,
            birthday,
            gender,
            address,
            phone,
            email,
            emergencyName,
            emergencyNumber,
            emergencyRelationship
        }
        axios.post('/api/patients', info)
            .then(() => {
                this.props.outsideCallback()
                this.resetState()
                this.props.handleClose()
            })
    }

    resetState = () => {
        this.setState({
            firstName: '',
            lastName: '',
            birthday: new Date(),
            gender: '',
            address: '',
            phone: '',
            email: '',
            emergencyName: '',
            emergencyNumber: '',
            emergencyRelationship: ''
        })
    }

    inputHandler = (e, property) => {
        this.setState({
            [property]: e.target.value
        })
    }

    handleDateChange = (date) => {
        this.setState({ birthday: date });
    }

    render() {
        const { birthday } = this.state;
    return (
      <div>
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Patient</DialogTitle>

                <DialogContent>

                    <TextField
                        autoFocus
                        margin="normal"
                        id="firstname"
                        label="First Name"
                        type="name"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "firstName")}
                        value = {this.state.firstName}
                    />

                    <TextField
                        margin="normal"
                        id="lastname"
                        label="Last Name"
                        type="name"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "lastName")}
                        value={this.state.lastName}
                    />


                        <div className="picker">
                            <DatePicker
                                label="Birthday"
                                format="MM/DD/YYYY"
                                placeholder="MM/DD/YYYY"
                                fullWidth
                                value={birthday}
                                onChange={this.handleDateChange}
                                leftArrowIcon={<ChevronLeft />}
                                rightArrowIcon={<ChevronRight />}
                            />
                        </div>

                    <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            fullWidth
                            value={this.state.gender}
                            input={<Input id="gender" />}
                            onChange={(e) => this.inputHandler(e, "gender")}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        margin="normal"
                        id="address"
                        label="Address"
                        type="address"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "address")}
                        value={this.state.address}
                    />

                    <TextField
                        margin="normal"
                        id="phonenumber"
                        label="Phone Number"
                        type="phone number"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "phone")}
                        value={this.state.phone}
                    />

                    <TextField
                        margin="normal"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "email")}
                        value={this.state.email}
                    />

                    <TextField
                        margin="normal"
                        id="ecName"
                        label="Emergency Contact Name"
                        type="name"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "emergencyName")}
                        value={this.state.emergencyName}
                    />

                    <TextField
                        margin="normal"
                        id="ecNumber"
                        label="Emergency Contact Number"
                        type="phone number"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "emergencyNumber")}
                        value={this.state.emergencyNumber}
                    />

                    <TextField
                        margin="normal"
                        id="ecRelationship"
                        label="Emergency Contact Relationship"
                        type="relationship"
                        fullWidth
                        onChange={(e) => this.inputHandler(e, "emergencyRelationship")}
                        value={this.state.emergencyRelationship}
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.addPatient} color="primary">
                        Add
                    </Button>
                </DialogActions>

            </Dialog>
      </div>
    )
  }
}
