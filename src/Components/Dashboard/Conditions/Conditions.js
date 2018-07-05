import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import ConditionSelector from './ConditionSelector';
import './Conditions.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default class Conditions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientConditions: [],
            conditions: [],
            openDelete: false,
            openAdd: false,
            value: '',
            patientConditionId: 0,
        }
        this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.getPatientConditions = this.getPatientConditions.bind(this);
        this.getConditionsList = this.getConditionsList.bind(this);
        this.updateCondition = this.updateCondition.bind(this);
    }
    radioGroup = null;

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getPatientConditions()
            this.getConditionsList()
        }
    }

    getPatientConditions() {
        axios.get(`/conditions/${this.props.patient_id}`).then(res => {
            // console.log("performing get conditions")
            // console.log(res.data)
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
            axios.put(`/condition/${id}`).then(() => {
                toast.success("Successfully deleted patient condition")
            }).catch((e) => console.log(e));
        }
        this.getPatientConditions();
    }

    handleClickOpenDelete = () => {
        this.setState({ openDelete: true });
    };

    handleCloseDelete = () => {
        this.setState({
            openDelete: false,

        });
    };

    handleClickOpenAdd = () => {
        this.setState({ openAdd: true });
    };

    handleCloseAdd = () => {
        this.setState({ openAdd: false });
    };

    render() {

        let conditionList = this.state.patientConditions
            .filter(el => !el.deleted)            
            .map((el, i) => {
                // console.log(el)
                return (
                    <div key={el.patient_condition_id + 'conList'}>
                        <ul id='listContainer'>
                            <li id='conditionTextHead'>{el.condition_name}</li>
                            <li id='conditionText'>{moment(el.condition_date_diagnosed).format('MM-DD-YYYY')}</li>
                            <br />
                        </ul>
                    </div>
                )
        })
        let pastConditionList = this.state.patientConditions
            .filter(el => !el.deleted)            
            .map((el, i) => {
                return (
                    <div key={el.patient_condition_id + 'conPastList'}>
                        <ul id='listContainer'>
                            <li id='conditionTextHead'>
                                {el.condition_name}</li>
                            <li id='conditionText'>{moment(el.condition_date_diagnosed).format('MM-DD-YYYY')}</li>
                            <br />
                        </ul>
                    </div>
                )
        })

        return (
            <div>
                {/* <ToastContainer /> */}
                {/* ////////////Card Header/Content///////////////// */}
                <Card style={{
                    marginTop: '20px',
                    borderRadius: '5px',
                    border: '1px solid rgba(0,0,0,0.3)',
                    boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.3)'
                }}>
                    <CardHeader
                        style={{
                            width: '100%',
                            background: '#E9F7FA',
                            padding: '10px',
                            borderBottom: '1px solid rgba(0,0,0,0.3)',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                            fontFamily: 'Roboto',
                            textTransform: 'uppercase',
                            fontSize: '1em'
                        }}
                        title="Conditions">
                    </CardHeader>
                    <CardContent
                        style={{
                            padding: 10
                        }}
                    >
                        {conditionList}
                    </CardContent>
                    {/* ////////////////////////////////////// */}

                    {/* ///////////////////PastConditions///////////////// */}
                    <div >
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography
                                    style={{
                                        fontSize: '0.9em',
                                    }}
                                >Past Conditions</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {pastConditionList}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>

                    {/* ///////////////////////////////////////////////////// */}

                    {/* /////////////////Add Button//////////////// */}
                    <Button
                        style={{
                            display: 'block-inline',
                            minWidth: '50%',
                            borderRadius: 0,
                            // borderTop: '1px solid rgba(0,0,0,0.3)',
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

                    {/* ///////////////////Delete Button///////////////////// */}
                    <Button
                        style={{
                            minWidth: '50%',
                            borderRadius: 0
                            // borderTop: '1px solid rgba(0,0,0,0.3)',
                            // borderRight: '1px solid rgba(0,0,0,0.3)'
                        }}
                        onClick={this.handleClickOpenDelete}>
                        Delete
                        <Delete style={{
                            marginLeft: '5px'
                        }} />
                    </Button>
                </Card>
                <div>
                    <Dialog
                        open={this.state.openDelete}
                        onClose={this.handleCloseDelete}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Delete Conditions</DialogTitle>
                        <div>
                            <List>
                                {this.state.patientConditions
                                    .filter(el => !el.deleted)
                                    .map((el, i) => {
                                        return (
                                            <ListItem key={i}>
                                                <ListItemText
                                                    primary={el.condition_name}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        aria-label="Delete"
                                                        onClick={() => {
                                                            // console.log(el)
                                                            this.updateCondition(el.patient_condition_id)
                                                        }
                                                        }
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                    }
                                    )}
                            </List>
                        </div>
                        <DialogActions>
                            <Button onClick={this.handleCloseDelete} color="primary">
                                Close
                                </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div >

        )
    }
}


