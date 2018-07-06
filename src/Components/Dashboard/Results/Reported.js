import React, { Component } from 'react'
import axios from 'axios'
import ExpandMore from "@material-ui/icons/ExpandMore";
import ReportedResult from './ReportedResult'
import _ from 'lodash'
import './Results.css'

export default class Reported extends Component {
  constructor() {
    super()

    this.state = {
      results: []
    }

    this.openParentTab = false
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
    let parentDropdown = document.getElementById('reportedDropdown')
    if (this.openParentTab) {
      document.getElementById('reportedArrow').className = "iconContainer"
      document.getElementById('reportedAccordian').className = "resultsAccordian"
      parentDropdown.style.maxHeight = 0
    } else {
      document.getElementById('reportedArrow').className = "iconContainer arrowUp"
      document.getElementById('reportedAccordian').className = "addMargin resultsAccordian"
      parentDropdown.style.maxHeight = `${parentDropdown.scrollHeight}px`
    }
    this.openParentTab = !this.openParentTab
  }

  render() {

    let { results } = this.state;
    let tests = _.uniq(results.map(x => x.test_id))
    let individualTests = tests.map((test, i) => {
      let data = results.filter(x => x.test_id === test)
      return (
        <ReportedResult data={data} key={`${i}ReportedData`} id={`${i+1}reportedData`} />
      )
    })

    return (
      <div className="resultsAccordian" id="reportedAccordian" >

        <div className="visibleTab">
          <h3>Reported Data</h3>
          <div className="iconContainer" id="reportedArrow"><ExpandMore onClick={this.changeHidden} /></div>
        </div>

        <div className="parentDropdown" id="reportedDropdown">
          {individualTests}
        </div>

      </div>
    )
  }
}
