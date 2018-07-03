import React, { Fragment, Component } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
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


class AddEmployee extends Component {
    constructor() {
        super()
        this.state = {
            first: '',
            last: '',
            picture: '',
            role: '',
            username: '',
            password: '',
            email:''
        }
    }

    inputHandler = (e, property) => {
        this.setState({
            [property]: e.target.value
        })
    }

    submit = () => {
        let {first, last, picture, role, username, password, email} =this.state
        axios.post('/employee', { first, last, picture, role, username, password, email }).then(this.props.history.go(0))
        this.props.handleClose()
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>

                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="normal"
                            id="first"
                            label="First Name"
                            type="name"
                            fullWidth
                            onChange={(e) => this.inputHandler(e, "first")}
                        />

                        <TextField
                            margin="normal"
                            id="last"
                            label="Last Name"
                            type="name"
                            fullWidth
                            onChange={(e) => this.inputHandler(e, "last")}
                        />

                        <TextField
                            margin="normal"
                            id="picture"
                            label="Picture url"
                            type="picture"
                            fullWidth
                            onChange={(e) => this.inputHandler(e, "picture")}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                fullWidth
                                value={this.state.role}
                                input={<Input id="role" />}
                                onChange={(e) => this.inputHandler(e, "role")}
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Non-Admin</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            margin="normal"
                            id="username"
                            label="username"
                            type="username"
                            fullWidth
                            onChange={(e) => this.inputHandler(e, "username")}
                        />

                        <TextField
                            margin="normal"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={(e) => this.inputHandler(e, "password")}
                        />

                        <TextField
                            margin="normal"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            onChange={(e) => this.inputHandler(e, "email")}
                        />


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.submit} color="primary">
                            Add
                    </Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}

export default withRouter(AddEmployee)