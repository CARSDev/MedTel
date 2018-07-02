import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import moment from 'moment'
import axios from 'axios'
import './Schedule.css'
import Day from './Day'

export default class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            date: new Date(),
            morning: moment(this.date).startOf('day')._d,
            night: moment(this.date).endOf('day')._d,
            schedule: []
        }
    }

    componentDidMount() {
        const { morning, night} = this.state
        // console.log(morning, night)
        let utc_morning = moment.utc(morning).format();
        let utc_night = moment.utc(night).format();
        // console.log(utc_morning, utc_night)
        axios.get(`/schedule/${utc_morning}/${utc_night}`).then(res => {
            this.setState({schedule:res.data})
            console.log(this.state.schedule)
        })
    }

    componentDidUpdate() {
        
    }

    onChange = date => {
        let morning = moment(date).startOf('day')._d
        let night = moment(date).endOf('day')._d
        this.setState({
            date,
            morning,
            night
        })
        // console.log(morning, night)
        let utc_morning = moment.utc(morning).format();
        let utc_night = moment.utc(night).format();
        // console.log(utc_morning, utc_night)
        axios.get(`/schedule/${utc_morning}/${utc_night}`).then(res => {
            this.setState({ schedule: res.data })
            console.log(this.state.schedule)
        })
    }


    render() {
        const {date, morning, schedule}= this.state
        return (
            <div className='schedule'>
                <DatePicker className='picker'
                    onChange={this.onChange}
                    value={date}
                />
                <Day date={date} morning={morning} schedule={schedule}/>
            </div>
        )
    }
}
