import React, {Component} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class MedicationDialogRaw extends Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            medications: [],
            medicationId: 0,
            // sideEffect: '',
            open: false
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    componentDidMount() {
        axios.get(`/med`).then(res => {
            this.setState({
                medications: res.data
            })
            toast.success("Successfully got Medications", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Medications", { position: toast.POSITION.BOTTOM_RIGHT }))
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
        let medicationElement = this.state.medications.find((el) => {
            if (value === el.medication_name) {
                return true;
            }
        })
        this.setState({
            value,
            medicationId: medicationElement.medication_id
        });
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value) => {
        this.setState({ value, open: false });
        let rxdate = moment.utc(new Date()).format()
        // console.log(rxdate)
        axios.post(`/med/${this.props.patient_id}`, { medication_id: this.state.medicationId, medication_date_prescribed: rxdate }).then(() => {
            this.props.getMedications()
        })
    };


    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.medication_id)
        return (
            <Dialog
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Medications</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={node => {
                            this.radioGroup = node;
                        }}
                        aria-label="medication"
                        name="medication"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {this.state.medications.map(option => (
                            <FormControlLabel
                                value={option.medication_name}
                                key={option.medication_id + 'select'}
                                control={<Radio />}
                                label={option.medication_name} />
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

