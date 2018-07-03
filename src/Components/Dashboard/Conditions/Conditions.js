import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
// import FlatButton from 'material-ui/FlatButton';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import ConditionSelector from './ConditionSelector';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


export default class Conditions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientConditions: [],
            conditions: [],
            openEdit: false,
            openAdd: false,
            value: '',
            patientConditionId: 0,
        }
        this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getPatientConditions = this.getPatientConditions.bind(this);
        this.getConditionsList = this.getConditionsList.bind(this);
        this.updateCondition = this.updateCondition.bind(this);
        // this.deleteCondition = this.deleteCondition.bind(this);
        // this.selectCondition = this.selectCondition.bind(this);
    }
    radioGroup = null;



    componentDidMount() {
        this.getPatientConditions()
        this.getConditionsList()
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getPatientConditions()
            this.getConditionsList()
        }
    }

    getPatientConditions() {
        axios.get(`/condition/${this.props.patient_id}`).then(res => {
            // console.log("performing get conditions")
            this.setState({
                patientConditions: res.data
            })
            toast.success("Successfully got Patient Conditions", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Patient Conditions", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    getConditionsList() {
        axios.get(`/conditions`).then(res => {
            this.setState({
                conditions: res.data
            })
            toast.success("Successfully got Conditions", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Conditions", { position: toast.POSITION.BOTTOM_RIGHT }))
    }
    updateCondition(id) {
        if (window.confirm('Are you sure you want to delete this condition?')) {
            axios.put(`/condition/${id}`).then(res => {
                toast.success("Successfully deleted patient condition")
            }).catch(() => toast.error(alert("Condition has a dependent records. Cannot be deleted")));
        }
        this.getPatientConditions();
    }
    // deleteCondition() {
    //     if (window.confirm('Are you sure you want to delete this condition?')) {
    //         axios.delete(`/condition/${this.state.patientConditionId}`).then(res => {
    //             this.setState({
    //                 all_instruments: res.data
    //             })
    //             toast.success("Successfully deleted patient condition")
    //         }).catch(() => toast.error(alert("Condition has a dependent records. Cannot be deleted")));
    //     }
    // }

    handleClickOpenEdit = () => {
        this.setState({ openEdit: true });
    };
    handleClose = () => {
        this.setState({openEdit: false});
    };
    handleCloseEdit = () => {
        this.setState({
            openEdit: false,

        });
    };
    handleCloseDelete = () => {
        this.setState({
            openEdit: false,

        });
        // this.deleteCondition();
    };

    handleClickOpenAdd = () => {
        this.setState({ openAdd: true });
    };

    handleCloseAdd = () => {
        this.setState({ openAdd: false });
    };
    selectCondition(id) {
        this.setState({
            patientConditionId: id
        })
    }

    render() {
        const { value, ...other } = this.props;
        let testConditions = ['asthma', 'krohns', 'allergies']

        let conditionListEdit = this.state.patientConditions.map((el, i) => {
            return (
                <div key={el + i}>
                    <TextField
                        select
                        margin="dense"
                        id={`${el.pateint_condition_id}`}
                        label="Condition Type"
                        value={`${el.condition_name}`}
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label= "Date Diagnosed"
                        value={`${moment(el.condition_date_diagnosed).format('MMM DD, YYYY')}`}
                        type="email"
                        fullWidth
                    />
                </div>
            )
        })
        let conditionList = this.state.patientConditions.map((el, i) => {
            return (

                <div key={el + i}>
                    <ul>
                        <li>{el.condition_name}</li><br />
                        <p>-{moment(el.condition_date_diagnosed).format('MMM DD, YYYY')}</p>
                    </ul>
                </div>

            )
        })

        return (
            <div>
                <ToastContainer />
                {/* ////////////Card Header/Content///////////////// */}
                <Card>
                    <CardHeader style={{
                        width: '100%',
                        background: '#EBF7F6',
                        borderRadius: 0,
                        borderTop: '1px solid rgba(0,0,0,0.3)',
                        borderRight: '1px solid rgba(0,0,0,0.3)'
                    }}
                        title="Conditions">
                    </CardHeader>
                    <CardContent>
                        {conditionList}
                    </CardContent>
                    {/* ////////////////////////////////////// */}

                    {/* /////////////////Add Button//////////////// */}
                    <Button
                        style={{
                            width: '100%',
                            borderRadius: 0,
                            borderTop: '1px solid rgba(0,0,0,0.3)',
                            borderRight: '1px solid rgba(0,0,0,0.3)'
                        }}
                        onClick={this.handleClickOpenAdd}
                    >
                        Add
                        <Add style={{
                            marginLeft: '5px'
                        }} />
                    </Button>

                    <Dialog
                        open={this.state.openAdd}
                        onClose={this.handleCloseAdd}
                        aria-labelledby="confirmation-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Add Conditions</DialogTitle>
                        <ConditionSelector patient_id={this.props.patient_id} getConditions={this.getPatientConditions} />
                    </Dialog>


                    {/* ///////////////////Edit Button///////////////////// */}
                    <Button
                        style={{
                            width: '100%',
                            borderRadius: 0,
                            borderTop: '1px solid rgba(0,0,0,0.3)',
                            borderRight: '1px solid rgba(0,0,0,0.3)'
                        }}
                        onClick={this.handleClickOpenEdit}
                    >
                        Delete
                        <Delete style={{
                            marginLeft: '5px'
                        }} />
                    </Button>
                </Card>
                <div>
                    <Dialog
                        open={this.state.openEdit}
                        onClose={this.handleCloseEdit}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Delete Conditions</DialogTitle>
                        <div>
                            <List>
                                {this.state.patientConditions.map((el, i) => {
                                 
                                    return (
                                            
                                        <ListItem>
                                            <ListItemText
                                                primary={el.condition_name}
                                                // secondary={secondary ? 'Secondary text' : null}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    aria-label="Delete"
                                                    onClick={this.updateCondition}
                                                >
                                                    <Delete  />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        )
                                    
                                }
                                )}
                                    
                                    
                            </List>
                        </div>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                            {/* <Button onClick={this.handleCloseEdit} color="primary">
                                Update
                                </Button>
                            <Button onClick={this.handleCloseDelete} color="primary">
                                Delete
                                </Button> */}
                        </DialogActions>
                    </Dialog>
                </div>
            </div >

        )
    }
}