import React, { Component } from 'react'
import EmployeeList from './EmployeeList/EmployeeList'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import AddEmployee from './AddEmployee/AddEmployee'

export default class Admin extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
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
        <EmployeeList />
        <AddEmployee open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} />
      </div>
    )
  }
}
