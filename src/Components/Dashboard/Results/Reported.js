import React, { Component } from 'react'
import axios from 'axios'
import ExpandMore from "@material-ui/icons/ExpandMore";
import LabResult from './LabResult'
import _ from 'lodash'
import './Results.css'

export default class Reported extends Component {
  constructor() {
    super()

    this.state = {
      results: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getReported()
    }
  }

  getReported = () => {
    axios.get(`/api/reported/${this.props.patient_id}`)
      .then((res) => {
        this.setState({
          results: res.data
        })
      })
  }

  changeHidden = () => {
    if (document.getElementById('reportedAccordian').classList[0] === 'resultsAccordian') {
      document.getElementById('reportedAccordian').className = "addMargin resultsAccordian"
      document.getElementById('reportedHidden').className = "hiddenTab hidden"
      document.getElementById('reportedArrow').className = "iconContainer arrowUp"
    } else {
      document.getElementById('reportedAccordian').className = "resultsAccordian"
      document.getElementById('reportedHidden').className = "hidden"
      document.getElementById('reportedArrow').className = "iconContainer"
    }
  }

  render() {

    return (
      <div className="resultsAccordian" id="reportedAccordian" >

        <div className="visibleTab">
          <h3>Reported Data</h3>
          <div className="iconContainer" id="reportedArrow"><ExpandMore onClick={this.changeHidden} /></div>
        </div>

        <div className="hidden" id="reportedHidden">
          
        </div>

      </div>
    )
  }
}
