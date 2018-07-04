import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import FamilyHistorySelector from './FamilyHistorySelector';
import '../Conditions/Conditions.css';


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


export default class FamilyHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientHx: [],
            history: [],
            openDelete: false,
            openAdd: false,
            value: '',
            patientHistoryId: 0,
        }
        this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.getPatientHx = this.getPatientHx.bind(this);
        this.updateHx = this.updateHx.bind(this);
    }
    radioGroup = null;

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getPatientHx()
        }
    }

    getPatientHx() {
        axios.get(`/hx/${this.props.patient_id}`).then(res => {
            // console.log("performing get family history")
            console.log(res.data)
            this.setState({
                patientHx: res.data
            })
            toast.success("Successfully got Patient Family History", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Patient Family History", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    updateHx(id) {
        if (window.confirm('Are you sure you want to modigy this history?')) {
            axios.put(`/hx/${id}`).then(() => {
                toast.success("Successfully modified patient history")
            }).catch((e) => console.log(e));
        }
        this.getPatientHx();
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
        const { value, ...other } = this.props;

        let hxList = this.state.patientHx.map((el, i) => {
                return (
                    <div key={el.family_history_id+'list'}>
                        <ul>
                            <li id='conditionText'>{el.condition_name}</li>
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
                    marginTop: '20px'
                }}>
                    <CardHeader style={{
                        width: '100%',
                        background: '#EBF7F6',
                        borderRadius: 0,
                        borderTop: '1px solid rgba(0,0,0,0.3)',
                        borderRight: '1px solid rgba(0,0,0,0.3)',
                    }}
                        title="Family History">
                    </CardHeader>
                    <CardContent>
                        {hxList}
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
                        <DialogTitle id="form-dialog-title">Add to Family History</DialogTitle>
                        <FamilyHistorySelector patient_id={this.props.patient_id} getHx={this.getPatientHx} />
                    </Dialog>

                    {/* ///////////////////Update Button///////////////////// */}
                    <Button
                        style={{
                            width: '100%',
                            borderRadius: 0,
                            borderTop: '1px solid rgba(0,0,0,0.3)',
                            borderRight: '1px solid rgba(0,0,0,0.3)'
                        }}
                        onClick={this.handleClickOpenDelete}>
                        Update
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
                                            </ListItem>
                                        )
                                }
                                )}
                            </List>
                        </div>
                        <DialogActions>
                            <Button onClick={this.handleCloseDelete} color="primary">
                                Cancel
                                </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div >

        )
    }
}