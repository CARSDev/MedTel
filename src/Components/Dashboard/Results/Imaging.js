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

    this.openParentTab = false
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
    let parentDropdown = document.getElementById('imagingDropdown')
    if (this.openParentTab) {
      document.getElementById('imagingArrow').className = "iconContainer"
      document.getElementById('imagingAccordian').className = "resultsAccordian"
      parentDropdown.style.maxHeight = 0
    } else {
      document.getElementById('imagingArrow').className = "iconContainer arrowUp"
      document.getElementById('imagingAccordian').className = "addMargin resultsAccordian"
      parentDropdown.style.maxHeight = `${parentDropdown.scrollHeight}px`
    }
    this.openParentTab = !this.openParentTab
  }

  render() {

    let { results } = this.state

    console.log(this.state.results)
    return (
      <div className="resultsAccordian" id="imagingAccordian" >

        <div className="visibleTab">
          <h3>Imaging Results</h3>
          <div className="iconContainer" id="imagingArrow"><ExpandMore onClick={this.changeHidden} /></div>
        </div>

        <div className="parentDropdown" id="imagingDropdown">
          Hidden
        </div>

      </div>
    )
  }
}
