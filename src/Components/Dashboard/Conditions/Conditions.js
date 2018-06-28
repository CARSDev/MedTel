import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { withStyles } from '@material-ui/core/styles';
import './Card2.css';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';


export default class Conditions extends Component {
    constructor() {
        super()
        this.state = {
            conditions: []
        }
    }

    componentDidMount() {
        
    }

    render() {


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
                        Conditions generated from the db
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