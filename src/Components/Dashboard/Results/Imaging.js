import React, { Component } from 'react'
import axios from 'axios'
import ExpandMore from "@material-ui/icons/ExpandMore";
import LabResult from './LabResult'
import _ from 'lodash'
import './Results.css'

export default class Imaging extends Component {
  constructor() {
    super()

    this.state = {
      results: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getImagingResults()
    }
  }

  getImagingResults = () => {
    axios.get(`/api/imagingResults/${this.props.patient_id}`)
      .then((res) => {
        this.setState({
          results: res.data
        })
      })
  }

  changeHidden = () => {
    if (document.getElementById('imagingAccordian').classList[0] === 'resultsAccordian') {
      document.getElementById('imagingAccordian').className = "addMargin resultsAccordian"
      document.getElementById('imagingHidden').className = "hiddenTab hidden"
      document.getElementById('imagingArrow').className = "iconContainer arrowUp"
    } else {
      document.getElementById('imagingAccordian').className = "resultsAccordian"
      document.getElementById('imagingHidden').className = "hidden"
      document.getElementById('imagingArrow').className = "iconContainer"
    }
  }

  render() {
    return (
      <div className="resultsAccordian" id="imagingAccordian" >

        <div className="visibleTab">
          <h3>Imaging Results</h3>
          <div className="iconContainer" id="imagingArrow"><ExpandMore onClick={this.changeHidden} /></div>
        </div>

        <div className="hidden" id="imagingHidden">
          Hidden
        </div>

      </div>
    )
  }
}
