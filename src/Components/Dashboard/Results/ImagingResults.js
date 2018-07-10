import React, { Component } from 'react'
import moment from 'moment'
import ExpandMore from "@material-ui/icons/ExpandMore"
import './Results.css'

export default class ImagingResults extends Component {
    constructor() {
        super()

        this.openimagingDropdown = false
    }

    changeHidden = () => {
        let imagingDropdown = document.getElementById(`${this.props.id}imagingDropdown`)
        let parentDropdown = document.getElementById('imagingDropdown')

        if (this.openimagingDropdown) {
            imagingDropdown.style.maxHeight = 0
            imagingDropdown.style.padding = '0px 20px'
            imagingDropdown.style.borderBottom = '0'
            parentDropdown.style.maxHeight = `${parentDropdown.scrollHeight}px`
            document.getElementById(`${this.props.id}individualImagingArrow`).className = "iconContainer"

        } else {
            imagingDropdown.style.padding = '20px'
            imagingDropdown.style.maxHeight = `${imagingDropdown.scrollHeight}px`
            imagingDropdown.style.borderBottom = '1px solid rgba(0,0,0,0.3)'
            parentDropdown.style.maxHeight = `${parentDropdown.scrollHeight + imagingDropdown.scrollHeight + 47}px`
            document.getElementById(`${this.props.id}individualImagingArrow`).className = "iconContainer arrowUp"
        }
        this.openimagingDropdown = !this.openimagingDropdown
    }
    
    render() {
    return (
      <div>
            <div className="labAccordion">
            
                <div className="labTab">
                    <div className="labCellL"><h3>{this.props.data.test_name}</h3></div>
                    <div className="labCellM"><h3>{moment(this.props.data.imaging_date).format('MM-DD-YYYY')}</h3></div>
                    <div className="labCellR"><div className="iconContainer" id={`${this.props.id}individualImagingArrow`}><ExpandMore onClick={this.changeHidden} /></div></div>
                </div>

                <div className="labDropdown" id={`${this.props.id}imagingDropdown`}>
                    <p>"{this.props.data.imaging_result}"</p>
                    <img src={this.props.data.imaging_pictures} alt = "imaging"/>
                </div>
            
            </div>
      </div>
    )
  }
}
