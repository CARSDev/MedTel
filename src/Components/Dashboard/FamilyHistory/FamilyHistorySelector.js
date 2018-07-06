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
import TextField from '@material-ui/core/TextField';

class FamilyHistoryDialogRaw extends React.Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            conditions: [],
            conditionId: 0,
            relationship: ''
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
        this.props.onClose(this.props.value);
    };

    handleOk = () => {
        if (this.state.relationship !== '') { 
            this.props.onClose(
                this.state.value,
                this.state.conditionId,
                this.state.relationship);
        } else {
            alert('Please add a relationship to patient.')
        }
    };

    handleChange = (event, value) => {
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
    }

    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.condition_id)
        return (
            <Dialog
                disableBackdropClick
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

FamilyHistoryDialogRaw.propTypes = {
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

class FamilyHistoryDialog extends React.Component {
    button = null;

    state = {
        open: false,
        value: 'Click to Add'
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value, conditionId, relationship) => {
        this.setState({ value, open: false });
        axios.post(`/hx/${this.props.patient_id}`, { condition_id: conditionId, family_history_relationship: relationship}).then(res => {
            this.props.getHx()
        })
        this.setState({
            value: 'Click to Add'
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
                        aria-controls="condition-menu"
                        aria-label="Condition"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText primary="Condition" secondary={this.state.value} />
                    </ListItem>
                    <FamilyHistoryDialogRaw
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

FamilyHistoryDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FamilyHistoryDialog);