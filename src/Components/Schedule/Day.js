import React, {Component} from 'react';
import './Day.css'
import moment from 'moment'

export default class Day extends Component{
    constructor(){
        super()
        this.state={
            times: [],
            patients: [],
            reasons: []
        }
    }

    componentDidMount() {
        var d = this.props.morning
        var timeStops = [];
        var amTime = moment(d).add(8, 'h')._d
        for (let i = 0; i < 10; i++){
            timeStops.push(amTime)
            amTime=moment(amTime).add(30, 'm')._d
        }

        var pmTime = moment(d).add(13, 'h')._d
        for (let i = 0; i < 8; i++) {
            timeStops.push(pmTime)
            pmTime = moment(pmTime).add(30, 'm')._d
        }
        this.setState({ times: timeStops })
    }

    render() {
        console.log(this.props.date)
        console.log(this.props.morning)
        const {times} = this.state

        return(
            <div className= 'dayList'>
                <div className='timesColumn'>
                    <h1>Appointment Time</h1>
                    {times.map((val, i) => {
                        return (
                            <h3 key={i} >{moment(val).format("h:mm A")}</h3>
                        )
                    })}
                </div>
                <div className="namesColumn">
                    <h1>Patient Name</h1>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                    <h3>Yo</h3>
                </div>
                <div className="reasonsColumn">
                    <h1>Reason for Visit</h1>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                    <h3>Diabeetus</h3>
                </div>
            </div>
        )
    }
}