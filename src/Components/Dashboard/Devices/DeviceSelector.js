import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class DeviceDialogRaw extends React.Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            devices: [],
            deviceId: 4,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    componentDidMount() {
        axios.get(`/devices`).then(res => {
            this.setState({
                devices: res.data
            })
            toast.success("Successfully got Devices", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Devices", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    handleEntering = () => {
        this.radioGroup.focus();
    };

    handleCancel = () => {
        this.props.onClose(this.props.value);
    };

    handleOk = () => {
        this.props.onClose(this.state.value, this.state.deviceId);
    };

    handleChange = (event, value) => {
        let deviceElement = this.state.devices.find((el) => {
            if (value === el.medical_device_name) {
                return true;
            }
        })
        this.setState({
            value,
            deviceId: deviceElement.medical_device_id
        });
    };

    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.deviceId)
        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Medical Devices</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={node => {
                            this.radioGroup = node;
                        }}
                        aria-label="medical device"
                        name="medical device"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {this.state.devices.map(option => (
                            <FormControlLabel
                                value={option.medical_device_name}
                                key={option.medical_device_id}
                                control={<Radio />}
                                label={option.medical_device_name} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DeviceDialogRaw.propTypes = {
    onClose: PropTypes.func,
    value: PropTypes.string,
};

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
});

class DeviceDialog extends React.Component {
    button = null;

    state = {
        open: false,
        value: 'Adjustable Gastric Band'
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value, deviceId) => {
        this.setState({ value, open: false });
        axios.post(`/device/${this.props.patient_id}`, { medical_device_id: deviceId, medical_device_date_administered: new Date() }).then(() => {
            this.props.getDevices()
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List>
                    <ListItem
                        button
                        divider
                        aria-haspopup="true"
                        aria-controls="medical-device-menu"
                        aria-label="Medical device"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText primary="Device" secondary={this.state.value} />
                    </ListItem>
                    <DeviceDialogRaw
                        classes={{
                            paper: classes.paper,
                        }}
                        open={this.state.open}
                        onClose={this.handleClose}
                        value={this.state.value}
                    />
                </List>
            </div>
        );
    }
}

DeviceDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceDialog);