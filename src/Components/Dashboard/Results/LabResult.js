import React, { Component } from 'react'
import ExpandMore from "@material-ui/icons/ExpandMore"
import './Results.css';

export default class LabResult extends Component {

    changeHidden = () => {
        if (document.getElementById(`${this.props.id}individualLabArrow`).classList.length === 1) {
            document.getElementById(`${this.props.id}individualResult`).className = 'individualHiddenTab'
            document.getElementById(`${this.props.id}individualLabArrow`).className = "iconContainer arrowUp"
        } else {
            document.getElementById(`${this.props.id}individualResult`).className = 'individualHiddenTab hiddenIndividual'
            document.getElementById(`${this.props.id}individualLabArrow`).className = "iconContainer"
        }
    }
    
    render() {
      console.log(this.props.data)
    return (
        <div className="individualResultAccordion">
            
            <div className="individualVisibleTab">
                <div className="individualTabCellL"><h3>{this.props.data[0].test_name}</h3></div>
                <div className="individualTabCellM"><h3>{this.props.data[0].lab_result}</h3></div>
                    <div className="individualTabCellR"><div className="iconContainer" id={`${this.props.id}individualLabArrow`}><ExpandMore onClick={this.changeHidden}/></div></div>
            </div>

            <div className="individualHiddenTab hiddenIndividual" id={`${this.props.id}individualResult`}>
                Hidden!
            </div>

        </div>
    )
  }
}
