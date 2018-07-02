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


export default class Conditions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientConditions: [],
            conditions: [],
            openEdit: false,
            openAdd: false,
            value: ''
        }
        this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
    }
    radioGroup = null;



    componentDidMount() {
        axios.get(`/condition/1`).then(res => {
            // console.log("performing get conditions")
            this.setState({
                patientConditions: res.data
            })
            toast.success("Successfully got Patient Conditions", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Patient Conditions", { position: toast.POSITION.BOTTOM_RIGHT }))
    }

    updateCondition() {
        
    }
    deleteCondition() {
        
    }

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
    };

    handleClickOpenAdd = () => {
        this.setState({ openAdd: true });
    };

    handleCloseAdd = () => {
        this.setState({ openAdd: false });
    };


    render() {
        const { value, ...other } = this.props;



        let conditionListEdit = this.state.patientConditions.map((el, i) => {
            return (

                <div key={el + i}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={el.condition_name}
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={el.condition_date_diagnosed}
                        type="email"
                        fullWidth
                    />
                    {/* <ul>
                            <li>{el.condition_name}</li><br />
                            <p>-{el.condition_date_diagnosed}</p>
                        </ul> */}
                </div>

            )
        })
        let conditionList = this.state.patientConditions.map((el, i) => {
            return (

                <div key={el + i}>
                    <ul>
                        <li>{el.condition_name}</li><br />
                        <p>-{el.condition_date_diagnosed}</p>
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
                        <ConditionSelector patient_id={this.props.patient_id} />
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
                        <DialogTitle id="form-dialog-title">Edit Conditions</DialogTitle>
                        <DialogContent>
                            {/* <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send
                                updates occasionally.
                            </DialogContentText> */}
                            {/* <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label={conditionList}
                                    type="email"
                                    fullWidth
                                /> */}
                            {conditionListEdit}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                            <Button onClick={this.handleCloseEdit} color="primary">
                                Edit
                                </Button>
                            <Button onClick={this.handleCloseDelete} color="primary">
                                Delete
                                </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div >

        )
    }
}