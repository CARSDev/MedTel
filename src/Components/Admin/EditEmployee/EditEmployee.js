import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
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


class EditEmployee extends Component {
    constructor() {
        super()
        this.state = {
            first: '',
            last: '',
            picture: '',
            role: '',
            username: '',
            password: '',
            email: ''
        }
    }

    componentDidUpdate(prevProps) {
        const {employee} =this.props
        if (prevProps !== this.props) {
            this.setState({
                first: employee.employee_first_name,
                last: employee.employee_last_name,
                picture: employee.employee_picture,
                role: employee.role_id,
                username: employee.employee_username,
                email: employee.employee_email
            })
        }
    }

    inputHandler = (e, property) => {
        this.setState({
            [property]: e.target.value
        })
    }

    submit = () => {
        let { first, last, picture, role, username, email } = this.state
        let id = this.props.employee.employee_id
        axios.put(`/employee/${id}`, { first, last, picture, role, username, email }).then(this.props.history.go(0))
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
                    <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>

                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="normal"
                            id="first"
                            label="First Name"
                            type="name"
                            fullWidth
                            value={this.state.first}
                            onChange={(e) => this.inputHandler(e, "first")}
                        />

                        <TextField
                            margin="normal"
                            id="last"
                            label="Last Name"
                            type="name"
                            fullWidth
                            value={this.state.last}
                            onChange={(e) => this.inputHandler(e, "last")}
                        />

                        <TextField
                            margin="normal"
                            id="picture"
                            label="Picture url"
                            type="picture"
                            fullWidth
                            value={this.state.picture}
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
                            value={this.state.username}
                            onChange={(e) => this.inputHandler(e, "username")}
                        />

                        <TextField
                            margin="normal"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={this.state.email}
                            onChange={(e) => this.inputHandler(e, "email")}
                        />


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.submit} color="primary">
                            Update
                    </Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}

export default withRouter(EditEmployee)