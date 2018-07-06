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
      results: [],
    }
    
    this.openParentTab = false

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
    let parentDropdown = document.getElementById('labsDropdown')
    if (this.openParentTab) {
      document.getElementById('labsArrow').className = "iconContainer"
      document.getElementById('labsAccordian').className = "resultsAccordian"
      parentDropdown.style.maxHeight = 0
    } else {
      parentDropdown.style.maxHeight = `${parentDropdown.scrollHeight}px`
      document.getElementById('labsArrow').className = "iconContainer arrowUp"
      document.getElementById('labsAccordian').className = "resultsAccordian addMargin"
    }
    this.openParentTab = !this.openParentTab
  }
  
  render() {

    let { results } = this.state;
    let tests = _.uniq(results.map(x => x.test_id))
    let individualTests = tests.map( (test, i) => {
      let data = results.filter(x => x.test_id === test)
      return (
        <LabResult data={data} key={`${i}labResults`} id={i+1}/>
      )
    })

    return (
      <div className="resultsAccordian" id="labsAccordian" >
        
        <div className="visibleTab" >
          <h3>Labs & Vitals</h3>
          <div className="iconContainer" id="labsArrow"><ExpandMore onClick={this.changeHidden}/></div>
        </div>

        <div className="parentDropdown" id="labsDropdown">
          {individualTests}
        </div>

      </div>
    )
  }
}
