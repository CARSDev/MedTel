import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import moment from 'moment'
import axios from 'axios'
import './Schedule.css'
import Day from './Day'
import AddPatient from './../PatientList/AddPatient';
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'

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
        this.getSchedule()
    }

    getSchedule = () => {
        const { morning, night } = this.state
        // console.log(morning, night)
        let utc_morning = moment.utc(morning).format();
        let utc_night = moment.utc(night).format();
        // console.log(utc_morning, utc_night)
        axios.get(`/schedule/${utc_morning}/${utc_night}`).then(res => {
            this.setState({ schedule: res.data })
            // console.log(this.state.schedule)
        })
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
            // console.log(this.state.schedule)
        })
    }


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const {date, morning, schedule}= this.state
        return (
            <div className='schedule'>
                <Button
                    variant="fab"
                    color="secondary"
                    style={{
                        position: "fixed",
                        bottom: 10,
                        left: 10
                    }}
                    onClick={this.handleClickOpen}
                >
                    <Add />
                </Button>
                <AddPatient open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} outsideCallback={this.getSchedule} />
                <DatePicker className='picker'
                    onChange={this.onChange}
                    value={date}
                />
                <Day date={date} morning={morning} schedule={schedule}/>
            </div>
        )
    }
}
