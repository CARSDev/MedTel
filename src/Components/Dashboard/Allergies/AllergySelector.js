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

class AllergiesDialogRaw extends React.Component {
    radioGroup = null;

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            allergies: [],
            allergyId:11,
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
        this.props.onClose(this.props.value);
    };

    handleOk = () => {
        this.props.onClose(this.state.value, this.state.allergyId);
    };

    handleChange = (event, value) => {
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

    render() {
        const { value, ...other } = this.props;
        // console.log(this.state.value)
        // console.log(this.state.allergy_id)
        return (
            <Dialog
                disableBackdropClick
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

AllergiesDialogRaw.propTypes = {
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

class AllergiesDialog extends React.Component {
    button = null;

    state = {
        open: false,
        value: 'Click to Add'
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = (value, allergyId) => {
        this.setState({ value, open: false });
        axios.post(`/allergy/${this.props.patient_id}`, { allergy_id: allergyId, allergy_date_diagnosed: moment.utc(new Date()).format() }).then(res => {
            this.props.getAllergies()
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
                        aria-controls="allergy-menu"
                        aria-label="Allergy"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText primary="Allergy" secondary={this.state.value} />
                    </ListItem>
                    <AllergiesDialogRaw
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

AllergiesDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllergiesDialog);