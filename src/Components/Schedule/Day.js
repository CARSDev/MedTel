import React, {Component} from 'react';
import './Day.css'

export default class Day extends Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        return(
            <div className= 'dayList'>
                <div className='timesColumn'>
                    <h1>Appointment Time</h1>
                    <h3>8:00am</h3>
                    <h3>8:30am</h3>
                    <h3>9:00am</h3>
                    <h3>9:30am</h3>
                    <h3>10:00am</h3>
                    <h3>10:30am</h3>
                    <h3>11:00am</h3>
                    <h3>11:30am</h3>
                    <h3>1:00pm</h3>
                    <h3>1:30pm</h3>
                    <h3>2:00pm</h3>
                    <h3>2:30pm</h3>
                    <h3>3:00pm</h3>
                    <h3>4:00pm</h3>
                    <h3>5:00pm</h3>
                    <h3>5:30pm</h3>
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