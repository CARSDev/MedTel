import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import moment from 'moment'
import axios from 'axios'
import VisitDetails from './VisitDetails'
import { Link } from 'react-router-dom'
import './Visits.css'

export default class Visits extends Component {
    constructor() {
        super()

        this.state = {
            patient_id: null,
            visits: [],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                patient_id: this.props.patient_id
            }, () => {
                this.getPatientInfo()
            })
        }
    }

    getPatientInfo = () => {
        let today = moment.utc(new Date()).format();
        axios.get(`/api/visits/${this.state.patient_id}/${today}`)
            .then((res) => {
                this.setState({
                    visits: res.data
                })
            })
    }
    
    render() {
        let visits = this.state.visits.map((visit, i) => {
            return (
                <div key={i}><VisitDetails data={visit} getPatientInfo={this.getPatientInfo}/></div>
            )
        } )
    return (
      <div className = "visits">
            <div className="visitsHeader">Recent Visits</div>
            <div className="visitsContent">{visits}</div>
            <div className="visitsButtons">
                <Link to = '/schedule'>
                <Button style={{
                    width: '100%',
                    borderRadius: 0,
                    borderTop: '1px solid rgba(0,0,0,0.3)',
                }} >
                    Add
                    <Add style={{
                        marginLeft: '5px'
                    }} />
                </Button>
                </Link>    
                {/* <Button style={{
                    width: '100%',
                    borderRadius: 0,
                    borderTop: '1px solid rgba(0,0,0,0.3)',
                }}>
                    Edit
                    <Edit style={{
                        height: '18px',
                        width: '18px',
                        marginLeft: '5px'
                    }} />
                </Button> */}
            </div>
      </div>
    )
  }
}
