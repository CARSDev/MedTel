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

export default class ConditionSelector extends Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            conditions: [],
            conditionId: 0,
             open: false,
            value: 'Click to Add'
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
        this.onClose();
    };

    handleChange = (event) => {
        let value = event.target.value
        let conditionElement = this.state.conditions.find((el) => {
            if (value === el.condition_name) {
                return true;
            }
        })
        // console.log(this.state.conditions)
        // console.log(value)

        this.setState({
            value: value,
            conditionId: conditionElement.condition_id
        });
        // console.log(this.state.conditionId)

    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value, conditionId) => {
        this.setState({ value, open: false });
        axios.post(`/condition/${this.props.patient_id}`, { condition_id: this.state.conditionId, condition_date_diagnosed: moment.utc(new Date()).format() }).then(res => {
            this.props.getConditions()
        })
        this.setState({
            value: 'Click to Add',
        })
    };


    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.conditionId)
        return (
            <Dialog
                // disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title"
                
                >Conditions</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={node => {
                            this.radioGroup = node;
                        }}
                        aria-label="condition"
                        name="condition"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            
        );
    }
}