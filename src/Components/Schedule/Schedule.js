import React, { Component } from 'react';
import DatePicker from 'react-date-picker'
import './Schedule.css'
import Day from './Day'

export default class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            date: new Date()
        }
    }

    onChange = date => this.setState({ date })


    render() {
        return (
            <div className='schedule'>
                <DatePicker
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <Day/>
            </div>
        )
    }
}
