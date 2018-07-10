import React, {Component} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
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

export default class DeviceSelectorextends extends Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            devices: [],
            deviceId: 0,
            open: false
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
        this.setState({
            open: true
        });
    };

    handleOk = () => {
        this.onClose();
    };

    handleChange = (event) => {
        let value = event.target.value
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
    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value) => {
        this.setState({ value, open: false });
        axios.post(`/device/${this.props.patient_id}`, { medical_device_id: this.state.deviceId, medical_device_date_administered: moment.utc(new Date()).format() }).then(() => {
            this.props.getDevices()
        })
    };
    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.deviceId)
        return (
            <Dialog
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
                    <Button onClick={this.props.onClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

