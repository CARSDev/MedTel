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

export default class AllergySelector extends Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            allergies: [],
            allergyId: 0,
            open: false
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    componentDidMount() {
        axios.get(`/allergies`).then(res => {
            this.setState({
                allergies: res.data
            })
            toast.success("Successfully got Allergies", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Allergies", { position: toast.POSITION.BOTTOM_RIGHT }))
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
        this.props.onClose(this.state.value, this.state.allergyId);
    };

    handleChange = (event) => {
        let value = event.target.value
        let allergyElement = this.state.allergies.find((el) => {
            if (value === el.allergy_name) {
                return true;
            }
        })
        this.setState({
            value,
            allergyId: allergyElement.allergy_id
        });
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value) => {
        this.setState({ value, open: false });
        axios.post(`/allergy/${this.props.patient_id}`, { allergy_id: this.state.allergyId, allergy_date_diagnosed: moment.utc(new Date()).format() }).then(()=> {
            this.props.getAllergies()
        })
    };

    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.allergy_id)
        return (
            <Dialog
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Allergies</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={node => {
                            this.radioGroup = node;
                        }}
                        aria-label="allergy"
                        name="allergy"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {this.state.allergies.map(option => (
                            <FormControlLabel
                                value={option.allergy_name}
                                key={option.allergy_id + 'select'}
                                control={<Radio />}
                                label={option.allergy_name} />
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
