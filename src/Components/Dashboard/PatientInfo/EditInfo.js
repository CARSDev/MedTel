import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker } from "material-ui-pickers";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
// import moment from "moment";

export default class EditInfo extends Component {

  render() {

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Patient</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              id="firstname"
              label="First Name"
              type="name"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_first_name")}
              value={this.props.firstName}
            />

            <TextField
              margin="normal"
              id="lastname"
              label="Last Name"
              type="name"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_last_name")}
              value={this.props.lastName}
            />

            <div className="picker">
              <DatePicker
                label="Birthday"
                format="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
                fullWidth
                value={this.props.birthday}
                onChange={this.props.handleDateChange}
                leftArrowIcon={<ChevronLeft />}
                rightArrowIcon={<ChevronRight />}
              />
            </div>

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                fullWidth
                value={this.props.gender}
                input={<Input id="gender" />}
                onChange={e => this.props.inputHandler(e, "patient_gender")}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              id="height"
              label="Height (inches)"
              type="height"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_height")}
              value={this.props.height}
            />
            <TextField
              margin="normal"
              id="weight"
              label="Weight (pounds)"
              type="weight"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_weight")}
              value={this.props.weight}
            />
            <TextField
              margin="normal"
              id="address"
              label="Address"
              type="address"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_address")}
              value={this.props.address}
            />

            <TextField
              margin="normal"
              id="phone number"
              label="Phone Number"
              type="phone number"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_phone_number")}
              value={this.props.phone}
            />

            <TextField
              margin="normal"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_email")}
              value={this.props.email}
            />

            <TextField
              margin="normal"
              id="ecName"
              label="Emergency Contact Name"
              type="name"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_emergency_contact_name")}
              value={this.props.contact1Name}
            />

            <TextField
              margin="normal"
              id="ecNumber"
              label="Emergency Contact Number"
              type="phone number"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_emergency_contact_number")}
              value={this.props.contact1Number}
            />

            <TextField
              margin="normal"
              id="ecRelationship"
              label="Emergency Contact Relationship"
              type="relationship"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_emergency_contact_relationship")}
              value={this.props.contact1Relationship}
            />
            <TextField
              margin="normal"
              id="ecName"
              label="Emergency Contact Name 2"
              type="name"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_emergency_contact_name2")}
              value={this.props.contact2Name}
            />

            <TextField
              margin="normal"
              id="ecNumber"
              label="Emergency Contact Number 2"
              type="phone number"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_emergency_contact_number2")}
              value={this.props.contact2Number}
            />

            <TextField
              margin="normal"
              id="ecRelationship"
              label="Emergency Contact Relationship 2"
              type="relationship"
              fullWidth
              onChange={e => this.props.inputHandler(e, "patient_emergency_contact_relationship2")}
              value={this.props.contact2Relationship}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.editPatient} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
