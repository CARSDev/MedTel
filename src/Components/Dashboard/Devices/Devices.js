import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import DeviceSelector from './DeviceSelector';
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


export default class Devices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientDevices: [],
            devices: [],
            openDelete: false,
            openAdd: false,
            value: '',
            patientDeviceId: 0,
        }
        this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.getPatientDevices = this.getPatientDevices.bind(this);
        this.getDevicesList = this.getDevicesList.bind(this);
        this.updateDevice = this.updateDevice.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getPatientDevices()
            this.getDevicesList()
        }
    }

    getPatientDevices() {
        axios.get(`/devices/${this.props.patient_id}`).then(res => {
            // console.log("performing get devices")
            // console.log(res.data)
            this.setState({
                patientDevices: res.data
            })
            toast.success("Successfully got Patient Devices", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Patient Devices", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    getDevicesList() {
        axios.get(`/devices`).then(res => {
            this.setState({
                devices: res.data
            })
            toast.success("Successfully got Devices", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Devices", { position: toast.POSITION.BOTTOM_RIGHT }))
    }
    updateDevice(id) {
        if (window.confirm('Are you sure you want to delete this device?')) {
            axios.put(`/device/${id}`).then(() => {
                toast.success("Successfully deleted patient device")
            }).catch((e) => console.log(e));
        }
        this.getPatientDevices();
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

        let deviceList = this.state.patientDevices.map((el, i) => {
            if (!el.deleted) {
                // console.log(el)
                return (
                    <div key={el.patient_medical_device_id}>
                        <ul id='listContainer'>
                            <li id='conditionTextHead'>{el.medical_device_name}</li>
                            <li id='conditionText'>{moment(el.medical_device_date_administered).format('MM-DD-YYYY')}</li>
                            <br />
                        </ul>
                    </div>
                )
            }

        })
        let pastDeviceList = this.state.patientDevices.map((el, i) => {
            if (el.deleted) {
                return (
                    <div key={el.patient_medical_device_id}>
                        <ul id='listContainer'>
                            <li id='conditionTextHead'>{el.medical_device_name}</li>
                            <li id='conditionText'>{moment(el.medical_device_date_diagnosed).format('MM-DD-YYYY')}</li>
                            <br />
                        </ul>
                    </div>
                )
            }

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
                        >Medical Devices</span>}>
                    </CardHeader>
                    <CardContent
                        style={{
                            padding: 10
                        }}
                    >
                        {deviceList}
                    </CardContent>
                    {/* ////////////////////////////////////// */}

                    {/* ///////////////////PastDevices///////////////// */}
                    <div >
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography
                                    style={{
                                        fontSize: '0.9em',
                                    }}
                                >Past Devices</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {pastDeviceList}
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
                            borderRight: '1px solid rgba(0,0,0,0.3)',
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
                        <DialogTitle id="form-dialog-title">Add Devices</DialogTitle>
                        <DeviceSelector patient_id={this.props.patient_id} getDevices={this.getPatientDevices} />
                    </Dialog>

                    {/* ///////////////////Delete Button///////////////////// */}
                    <Button
                        style={{
                            minWidth: '50%',
                            borderRadius: 0,
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
                        <DialogTitle id="form-dialog-title">Delete Devices</DialogTitle>
                        <div>
                            <List>
                                {this.state.patientDevices.map((el, i) => {
                                    if (!el.deleted)
                                        return (
                                            <ListItem key={`${i}Devices`}>
                                                <ListItemText
                                                    primary={el.medical_device_name}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        aria-label="Delete"
                                                        onClick={() => {
                                                            // console.log(el)
                                                            this.updateDevice(el.patient_medical_device_id)
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