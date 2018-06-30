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



export default class Conditions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            conditions: [],
        }
    }

    componentDidMount() {
        axios.get(`/condition/1`).then(res => {
            // console.log("performing get conditions")
            this.setState({
                conditions: res.data
            })
            toast.success("Successfully got Conditions", { position: toast.POSITION.BOTTOM_RIGHT })
        }).catch(() => toast.error("Failed to Fetch Conditions", { position: toast.POSITION.BOTTOM_RIGHT }))

    }

    render() {
        let conditionList = this.state.conditions.map((el, i) => {
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
                <ToastContainer/>
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
                    <Button
                        style={{
                        width: '100%',
                        borderRadius: 0,
                        borderTop: '1px solid rgba(0,0,0,0.3)',
                        borderRight: '1px solid rgba(0,0,0,0.3)'
                        }}
                    >
                        Add
                        <Add style={{
                            marginLeft: '5px'
                        }} />
                    </Button>

                    <Button style={{
                        width: '100%',
                        borderRadius: 0,
                        borderTop: '1px solid rgba(0,0,0,0.3)',
                        borderRight: '1px solid rgba(0,0,0,0.3)'
                    }} >
                        Edit
                        <Edit style={{
                            marginLeft: '5px'
                        }} />
                    </Button>
                </Card>
            </div>

        )
    }
}