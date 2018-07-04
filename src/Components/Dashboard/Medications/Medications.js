import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import MedicationSelector from './MedicationSelector';
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


export default class Medications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientMedications: [],
            medications: [],
            openDelete: false,
            openAdd: false,
            value: '',
            patientMedicationId: 0
        }
        this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.getPatientMedications = this.getPatientMedications.bind(this);
        this.getMedicationsList = this.getMedicationsList.bind(this);
        this.updateMedication = this.updateMedication.bind(this);
    }
    radioGroup = null;

    componentDidMount() {
        this.getPatientMedications()
        this.getMedicationsList()
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getPatientMedications()
            this.getMedicationsList()
        }
    }

    getPatientMedications() {
        axios.get(`/med/${this.props.patient_id}`).then(res => {
            // console.log("performing get medications")
            // console.log(res.data)
            this.setState({
                patientMedications: res.data
            })
            toast.success("Successfully got Patient Medications", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Patient Medications", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    getMedicationsList() {
        axios.get(`/med`).then(res => {
            this.setState({
                medications: res.data
            })
            toast.success("Successfully got Medications", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Medications", { position: toast.POSITION.BOTTOM_RIGHT }))
    }
    updateMedication(id) {
        if (window.confirm('Are you sure you want to delete this medication?')) {
            axios.put(`/med/${id}`).then(() => {
                toast.success("Successfully deleted patient medication")
            }).catch((e) => console.log(e));
        }
        this.getPatientMedications();
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

        let medicationsList = this.state.patientMedications.map((el, i) => {
            if (!el.deleted) {
                // console.log(el)
                return (
                    <div key={el.patient_medication_id+'current'}>
                        <ul>
                            <li id='conditionText'>{el.medication_name}</li>
                            <li id='conditionText'>{moment(el.medication_date_prescribed).format('MM-DD-YYYY')}
                            </li>
                            <li id='conditionText'>{el.medication_side_effects}</li> 
                            <br />
                        </ul>
                    </div>
                )
            }

        })
        let pastMedicationsList = this.state.patientMedications.map((el, i) => {
            if (el.deleted) {
                return (
                    <div key={el.patient_medication_id + 'past'}>
                        <ul>
                            <li id='conditionText'>{el.medication_name}</li>
                            <li id='conditionText'>{moment(el.medication_date_prescribed).format('MM-DD-YYYY')}</li>
                            <li id='conditionText'>{el.medication_side_effects}</li> 
                            <br />
                        </ul>
                    </div>
                )
            }

        })

        return (
            <div>
                <ToastContainer />
                {/* ////////////Card Header/Content///////////////// */}
                <Card style={{
                    marginTop: '20px'
                }}>
                    <CardHeader style={{
                        width: '100%',
                        background: '#EBF7F6',
                        borderRadius: 0,
                        borderTop: '1px solid rgba(0,0,0,0.3)',
                        borderRight: '1px solid rgba(0,0,0,0.3)'
                    }}
                        title="Medications">
                    </CardHeader>
                    <CardContent>
                        {medicationsList}
                    </CardContent>
                    {/* ////////////////////////////////////// */}

                    {/* ///////////////////PastMedications///////////////// */}
                    <div >
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >Past Medications</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {pastMedicationsList}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>

                    {/* ///////////////////////////////////////////////////// */}

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
                        <DialogTitle id="form-dialog-title">Add Medications</DialogTitle>
                        <MedicationSelector patient_id={this.props.patient_id} getMedications={this.getPatientMedications} />
                    </Dialog>

                    {/* ///////////////////Delete Button///////////////////// */}
                    <Button
                        style={{
                            width: '100%',
                            borderRadius: 0,
                            borderTop: '1px solid rgba(0,0,0,0.3)',
                            borderRight: '1px solid rgba(0,0,0,0.3)'
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
                        <DialogTitle id="form-dialog-title">Delete Medications</DialogTitle>
                        <div>
                            <List>
                                {this.state.patientMedications.map((el, i) => {
                                    if (!el.deleted)
                                        return (
                                            <ListItem key={el.patient_medication_id + 'list'}>
                                                <ListItemText
                                                    primary={el.medication_name}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        aria-label="Delete"
                                                        onClick={() => {
                                                            // console.log(el)
                                                            this.updateMedication(el.patient_medication_id)
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
                                Cancel
                                </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div >

        )
    }
}