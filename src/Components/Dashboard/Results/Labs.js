import React, { Component } from 'react'
import ExpandMore from "@material-ui/icons/ExpandMore"
import axios from 'axios'
import _ from 'lodash'
import LabResult from './LabResult'
import './Results.css'

export default class Labs extends Component {
  constructor() {
    super()

    this.state = {
      results: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getLabResults()
    }
  }

  getLabResults = () => {
    axios.get(`/api/labResults/${this.props.patient_id}`)
      .then((res) => {
        this.setState({
          results: res.data
        })
      })
  }

  changeHidden = () => {
    if (document.getElementById('labsAccordian').classList[0] === 'resultsAccordian') {
      document.getElementById('labsAccordian').className = "addMargin resultsAccordian"
      document.getElementById('labsHidden').className = "hiddenTab hidden"
      document.getElementById('labsArrow').className = "iconContainer arrowUp"
    } else {
      document.getElementById('labsAccordian').className = "resultsAccordian"
      document.getElementById('labsHidden').className = "hidden"
      document.getElementById('labsArrow').className = "iconContainer"
    }
  }
  
  render() {

    let { results } = this.state;
    let tests = _.uniq(results.map(x => x.test_id))
    let individualTests = tests.map( (test, i) => {
      let data = results.filter(x => x.test_id === test)
      return (
        <LabResult data={data} key={i} id={i+1}/>
      )
    })

    return (
      <div className="resultsAccordian" id="labsAccordian" >
        
        <div className="visibleTab">
          <h3>Labs & Vitals</h3>
          <div className="iconContainer" id="labsArrow"><ExpandMore onClick={this.changeHidden}/></div>
        </div>

        <div className="hidden" id="labsHidden">
          {individualTests}
        </div>

      </div>
    )
  }
}
