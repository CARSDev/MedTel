import React from 'react';
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
import TextField from '@material-ui/core/TextField';

class MedicationDialogRaw extends React.Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            medications: [],
            medicationId: 1,
            sideEffect: ''
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
        this.props.onClose(this.props.value);
    };

    handleOk = () => {
        this.props.onClose(
            this.state.value,
            this.state.medicationId,
            this.state.sideEffect
        );
    };

    handleChange = (event, value) => {
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
    handleText(input) {
        this.setState({
            sideEffect: input
        })
    }

    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.medication_id)
        return (
            <Dialog
                disableBackdropClick
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
                    <TextField
                        required
                        id="required"
                        label="Required"
                        defaultValue="Side Effect"
                        onChange={(e)=>this.handleText(e.target.value)}
                        // className={classes.textField}
                        margin="normal"
                    />
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

MedicationDialogRaw.propTypes = {
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

class MedicationDialog extends React.Component {
    button = null;

    state = {
        open: false,
        value: 'Albuterol'
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value, medicationId, sideEffect) => {
        this.setState({ value, open: false });
        let rxdate = moment.utc(new Date()).format()
        // console.log(rxdate)
        axios.post(`/med/${this.props.patient_id}`, { medication_id: medicationId, medication_date_prescribed: rxdate, medication_side_effect: sideEffect }).then(() => {
            this.props.getMedications()
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
                        aria-controls="medication-menu"
                        aria-label="Medication"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText primary="Medication" secondary={this.state.value} />
                    </ListItem>
                    <MedicationDialogRaw
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

MedicationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedicationDialog);