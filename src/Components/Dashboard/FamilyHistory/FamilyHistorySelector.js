import React, {Component} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

export default class FamilyHistorySelector extends Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            conditions: [],
            conditionId: 0,
            relationship: '',
            open: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    componentDidMount() {
        axios.get(`/conditions`).then(res => {
            this.setState({
                conditions: res.data
            })
            toast.success("Successfully got Conditions", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Conditions", { position: toast.POSITION.BOTTOM_RIGHT }))
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
        if (this.state.relationship !== '') { 
            this.handleClose(
                this.state.value,
                this.state.conditionId,
                this.state.relationship);
        } else {
            alert('Please add a relationship to patient.')
        }
    };

    handleChange = (event) => {
        let value = event.target.value
        let conditionElement = this.state.conditions.find((el) => {
            if (value === el.condition_name) {
                return true;
            }
        })
        this.setState({
            value,
            conditionId: conditionElement.condition_id
        });
    };

    handleText(input) {
        this.setState({
            relationship: input
        })
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value, conditionId, relationship) => {
        this.setState({ value, open: false });
        axios.post(`/hx/${this.props.patient_id}`, { condition_id: conditionId, family_history_relationship: relationship }).then(res => {
            this.props.getHx()
        })
    };

    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.condition_id)
        return (
            <Dialog
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Family History Condition</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={node => {
                            this.radioGroup = node;
                        }}
                        aria-label="family history condition"
                        name="family history condition"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {this.state.conditions.map(option => (
                            <FormControlLabel
                                value={option.condition_name}
                                key={option.condition_id}
                                control={<Radio />}
                                label={option.condition_name} />
                        ))}
                    </RadioGroup>
                    <TextField
                        required
                        id="required"
                        label="Required"
                        // defaultValue="Relation to Patient"
                        onChange={(e) => this.handleText(e.target.value)}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

