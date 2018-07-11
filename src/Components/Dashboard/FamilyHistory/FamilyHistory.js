import React, { Component } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import FamilyHistorySelector from './FamilyHistorySelector';
import '../Conditions/Conditions.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


export default class FamilyHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientHx: [],
            history: [],
            openEdit: false,
            openSub: false,
            openAdd: false,
            patientHistoryId: 0,
            conditionId: 0,
            realtionship: '',
            conditions: []
        }
        this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleClickOpenSub = this.handleClickOpenSub.bind(this);
        this.handleCloseSub = this.handleCloseSub.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.getPatientHx = this.getPatientHx.bind(this);
        this.updateHx = this.updateHx.bind(this);
        this.handleHxId = this.handleHxId.bind(this);
        this.handleCondition = this.handleCondition.bind(this);
        this.handleRelationship = this.handleRelationship.bind(this);
    }
    radioGroup = null;

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getPatientHx()
            this.getConditionsList()
        }
    }

    getPatientHx() {
        axios.get(`/hx/${this.props.patient_id}`).then(res => {
            // console.log("performing get family history")
            // console.log(res.data)
            this.setState({
                patientHx: res.data
            })
            toast.success("Successfully got Patient Family History", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Patient Family History", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    getConditionsList() {
        axios.get(`/conditions`).then(res => {
            this.setState({
                conditions: res.data
            })
            toast.success("Successfully got Conditions", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Conditions", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    updateHx(id) {
        if (window.confirm('Are you sure you want to modify this history?')) {
            axios.put(`/hx/${id}`, { condition_id: this.state.conditionId, family_history_relationship: this.state.realtionship }).then(() => {
                toast.success("Successfully modified patient history")
            }).catch((e) => console.log(e));
        }
        this.getPatientHx();
        this.handleCloseSub();
    }

    handleClickOpenEdit = () => {
        this.setState({ openEdit: true });
    };

    handleCloseEdit = () => {
        this.setState({
            openEdit: false,
        });
    };

    handleClickOpenSub = (id, rel) => {
        this.setState({
            openSub: true,
            conditionId: id,
            realtionship: rel
        });
    };

    handleCloseSub = () => {
        this.setState({
            openSub: false,
            openEdit: false,
            realtionship: '',
            patientHistoryId: 0,
            conditionId: 0
        });
        this.handleClickOpenEdit();
    };

    handleClickOpenAdd = () => {
        this.setState({ openAdd: true });
    };

    handleCloseAdd = () => {
        this.setState({ openAdd: false });
    };

    handleHxId(id) {
        this.setState({
            patientHistoryId: id
        })
        // console.log(id)
    }

    handleCondition(id) {
        this.setState({
            conditionId: id
        })
        // console.log(id)
    }

    handleRelationship(type) {
        this.setState({
            realtionship: type
        })
    }

    render() {
        // console.log(this.state.realtionship)
        let hxList = this.state.patientHx.map((el, i) => {
            return (
                <div key={el.family_history_id + 'list'}>
                    <ul id='listContainer'>
                        <li id='conditionTextHead'>{el.condition_name}</li>
                        <li id='conditionText'>{el.family_history_relationship}</li>
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
                    <CardHeader style={{
                        width: '100%',
                        background: '#E9F7FA',
                        padding: 1,
                        margin: 0,
                        borderBottom: '1px solid rgba(0,0,0,0.3)',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                        fontFamily: 'Roboto',
                        textTransform: 'uppercase'
                    }}
                        title={<span
                            style={{
                                fontSize: '0.7em',
                                padding: '0px',
                            }}
                        >Family History</span>}>
                    </CardHeader>
                    <CardContent
                        style={{
                            padding: 10
                        }}
                    >
                        {hxList}
                    </CardContent>
                    {/* ////////////////////////////////////// */}

                    {/* /////////////////Add Button//////////////// */}
                    <Button
                        style={{
                            display: 'block-inline',
                            minWidth: '50%',
                            borderRadius: 0,
                            borderRight: '1px solid rgba(0,0,0,0.3)',
                            borderTop: '1px solid rgba(0,0,0,0.3)'
                        }}
                        onClick={this.handleClickOpenAdd}
                    >
                        Add
                        <Add style={{
                            marginLeft: '5px'
                        }} />
                    </Button>
                    <FamilyHistorySelector
                        patient_id={this.props.patient_id}
                        getHx={this.getPatientHx}
                        open={this.state.openAdd}
                        onClose={this.handleCloseAdd}
                    />

                    {/* ///////////////////Update Button///////////////////// */}
                    <Button
                        style={{
                            minWidth: '50%',
                            borderRadius: 0,
                            borderTop: '1px solid rgba(0,0,0,0.3)'
                        }}
                        onClick={this.handleClickOpenEdit}>
                        Edit
                        <Edit style={{
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
                        <DialogTitle id="form-dialog-title">Update Family History</DialogTitle>
                        <div>
                            <List>
                                {this.state.patientHx.map((el, i) => {

                                    return (

                                        <ListItem key={el.family_history_id + 'list2'}>
                                            <ListItemText
                                                primary={el.condition_name}
                                            />
                                            <ListItemText
                                                primary={el.family_history_relationship}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    aria-label="Edit"
                                                    onClick={() => {
                                                        // console.log(el)
                                                        this.handleClickOpenSub(
                                                            el.condition_id,
                                                            el.family_history_relationship
                                                        )
                                                        this.handleHxId(
                                                            el.family_history_id
                                                        )
                                                    }
                                                    }>
                                                    <Edit />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }
                                )}
                            </List>
                            <Dialog
                                open={this.state.openSub}
                                onClose={this.handleCloseSub}
                                aria-labelledby="Individual Edit"
                            >
                                <TextField
                                    id="select-currency-native"
                                    select
                                    label="Select Condition"
                                    value={this.state.conditionId}
                                    SelectProps={{
                                        native: true,
                                        onChange: (e) => this.handleCondition(e.target.value)
                                    }}
                                    margin="normal"
                                >
                                    {this.state.conditions.map(el => (
                                        <option key={el.condition_id} value={el.condition_id} label={el.condition_name}>
                                            {el.condition_name}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    id="helperText"
                                    label="Relationship to Patient"
                                    defaultValue={this.state.realtionship}
                                    onChange={(e) => this.handleRelationship(e.target.value)}
                                    margin="normal"
                                />
                                <DialogActions>
                                    <Button onClick={this.handleCloseSub} color="primary">
                                        Cancel
                                </Button>
                                    <Button onClick={() =>
                                        this.updateHx(this.state.patientHistoryId)
                                    }
                                        color="primary">
                                        Update
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <DialogActions>
                            <Button onClick={this.handleCloseEdit} color="primary">
                                Close
                                </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div >

        )
    }
}