import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import AllergySelector from './AllergySelector';
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


export default class Allergies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientAllergies: [],
            allergies: [],
            openDelete: false,
            openAdd: false,
            value: '',
            patientAllergyId: 0,
        }
        this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.getPatientAllergies = this.getPatientAllergies.bind(this);
        this.getAllergiesList = this.getAllergiesList.bind(this);
        this.updateAllergy = this.updateAllergy.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getPatientAllergies()
            this.getAllergiesList()
        }
    }

    getPatientAllergies() {
        axios.get(`/allergies/${this.props.patient_id}`).then(res => {
            // console.log("performing get allergies")
            // console.log(res.data)
            this.setState({
                patientAllergies: res.data
            })
            toast.success("Successfully got Patient Allergies", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Patient Allergies", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    getAllergiesList() {
        axios.get(`/allergies`).then(res => {
            this.setState({
                allergies: res.data
            })
            toast.success("Successfully got Allergies", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Allergies", { position: toast.POSITION.BOTTOM_RIGHT }))
    }
    updateAllergy(id) {
        if (window.confirm('Are you sure you want to delete this allergy?')) {
            axios.put(`/allergy/${id}`).then(()=> {
                toast.success("Successfully deleted patient allergy")
            }).catch((e) => console.log(e));
        }
        this.getPatientAllergies();
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

        let allergyList = this.state.patientAllergies
            .filter(el => !el.deleted)
            .map((el, i) => {
                // console.log(el)
                return (
                    <div key={el.patient_allergy_id}>
                        <ul id='listContainer'>
                            <li id='conditionTextHead'>{el.allergy_name}</li>
                            <li id='conditionText'>{moment(el.allergy_date_diagnosed).format('MM-DD-YYYY')}</li>
                            <br />
                        </ul>
                    </div>
                )
        })
        let pastAllergyList = this.state.patientAllergies
            .filter(el => !el.deleted)
            .map((el, i) => {
                return (
                    <div key={el.patient_allergy_id}>
                        <ul id='listContainer'>
                            <li id='conditionTextHead'>{el.allergy_name}</li>
                            <li id='conditionText'>{moment(el.allergy_date_diagnosed).format('MM-DD-YYYY')}</li>
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
                        textTransform: 'uppercase',
                    }}
                        title={<span
                            style={{
                                fontSize: '0.7em',
                                padding: '0px',
                            }}>Allergies</span>}>
                    </CardHeader>
                    <CardContent
                        style={{
                            padding: 10
                        }}
                    >
                        {allergyList}
                    </CardContent>
                    {/* ////////////////////////////////////// */}

                    {/* ///////////////////PastAllergies///////////////// */}
                    <div >
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography
                                    style={{
                                        fontSize: '0.9em',
                                    }}
                                >Past Allergies</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                    {pastAllergyList}
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
                    <AllergySelector
                        patient_id={this.props.patient_id}
                        getAllergies={this.getPatientAllergies}
                        open={this.state.openAdd}
                        onClose={this.handleCloseAdd}
                    />

                    {/* ///////////////////Delete Button///////////////////// */}
                    <Button
                        style={{
                            minWidth: '50%',
                            borderRadius: 0
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
                        <DialogTitle id="form-dialog-title">Delete Allergies</DialogTitle>
                        <div>
                            <List>
                                {this.state.patientAllergies
                                    .filter(el => !el.deleted)
                                    .map((el, i) => {
                                        return (
                                                <ListItem key={el.patient_allergy_id + 'list'}>
                                                <ListItemText
                                                    primary={el.allergy_name}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        aria-label="Delete"
                                                        onClick={() => {
                                                            // console.log(el)
                                                            this.updateAllergy(el.patient_allergy_id)
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