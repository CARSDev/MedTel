import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from '@material-ui/core/Card';
// import FlatButton from 'material-ui/FlatButton';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import axios from 'axios';


export default class Conditions extends Component {
    constructor(props) {
        super(props)
        this.state = {
           conditions: []
        }
    }

    componentDidMount() {
        axios.get(`/condition/${this.props.patient_id}`).then(res => {
            this.setState({
                conditions: []
            })
        })
    }

    render() {
        let conditionList = this.conditions.map((el) => {
            return (
                <div key={el}>
                    <ul>
                        <li>{el.condition_name}</li><br />
                        <p>-{el.condition_date_diagnosed}</p>
                        </ul>
                </div>
                
                )
            })

        return (
            <div>
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
                    <CardText>
                        {conditionList}
                    </CardText>
                    <Button style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 0,
                        borderTop: '1px solid rgba(0,0,0,0.3)',
                        borderRight: '1px solid rgba(0,0,0,0.3)'
                    }} >
                        Add
                        <Add style={{
                            marginLeft: '5px'
                        }} />
                    </Button>

                    <Button style={{
                        display: 'flex',
                        flexDirection: 'row',
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