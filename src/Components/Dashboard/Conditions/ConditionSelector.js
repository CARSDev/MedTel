import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
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

class ConfirmationDialogRaw extends React.Component {
    radioGroup = null;

    constructor(props) {
        super(props);
        
        this.state = {
            value: this.props.value,
            conditions: [],
            conditionId: 0,
            time: ''
        };
    }

    state = {};

    // TODO
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

    // updateConditions() {
    //     axios.post(`/condition/${this.props.patient_id}`, { condition_id: this.state.value2, condition_date_diagnosed: this.state.time}).then(res => {
    //         this.state({

    //         })
    //     })
    // }

    handleEntering = () => {
        this.radioGroup.focus();
    };

    handleCancel = () => {
        this.props.onClose(this.props.value, this.props.value2);
    };

    handleOk = () => {
        this.props.onClose(this.state.value);
        this.setState({
            // time: date.getTime()
        })
        // this.updateConditions();
    };

    handleChange = (event, value) => {
        this.setState({
            value
        });
    };

    handleClick = (id)=>{
        this.setState({
            conditionId: id
        })
    }

    render() {
        const { value, ...other } = this.props;
        console.log(this.state.value)
        console.log(this.state.condition_id)
        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Conditions</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={node => {
                            this.radioGroup = node;
                        }}
                        aria-label="condition"
                        name="condition"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                    >
                        {this.state.conditions.map(option => (
                            <FormControlLabel
                                value={option.condition_name}
                                key={option.condition_id}
                                control={<Radio  />}
                                label={option.condition_name} />
                        ))}
                        {/* {conditionList} */}
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

ConfirmationDialogRaw.propTypes = {
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

class ConfirmationDialog extends React.Component {
    button = null;

    state = {
        open: false,
        value: 'Asthma'
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value, value2) => {
        this.setState({ value, open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List>
                    {/* <ListItem button divider disabled>
                        <ListItemText primary="Interruptions" />
                    </ListItem> */}
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
                    {/* <ListItem button divider disabled>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem> */}
                    <ConfirmationDialogRaw
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

ConfirmationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmationDialog);