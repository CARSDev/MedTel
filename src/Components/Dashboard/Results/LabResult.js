import React, { Component } from 'react'
import ExpandMore from "@material-ui/icons/ExpandMore"
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import './Results.css';

export default class LabResult extends Component {
    constructor() {
        super()

        this.openLabDropdown = false
    }
    
    changeHidden = () => {
        let labDropdown = document.getElementById(`${this.props.id}labDropdown`)
        let parentDropdown = document.getElementById('labsDropdown')

        if (this.openLabDropdown) {
            labDropdown.style.maxHeight = 0
            labDropdown.style.padding = '0px 20px'
            labDropdown.style.borderBottom = '0'
            parentDropdown.style.maxHeight = `${parentDropdown.scrollHeight}px`
            document.getElementById(`${this.props.id}individualLabArrow`).className = "iconContainer"
            
        } else {
            labDropdown.style.padding = '20px'
            labDropdown.style.maxHeight = `${labDropdown.scrollHeight}px`
            labDropdown.style.borderBottom = '1px solid rgba(0,0,0,0.3)'
            parentDropdown.style.maxHeight = `${parentDropdown.scrollHeight + labDropdown.scrollHeight + 47}px`
            document.getElementById(`${this.props.id}individualLabArrow`).className = "iconContainer arrowUp"
        }
        this.openLabDropdown = !this.openLabDropdown
    }
    
    render() {
        const data = {
            labels: this.props.data.map(entry => moment(entry.lab_date).format('MM/DD/YYYY')).reverse(),
            datasets: [
                {
                    label: 'Results',
                    fill: true,
                    data: this.props.data.map(entry => entry.lab_result).reverse(),
                    borderColor: '#3e8ec7',
                    backgroundColor: 'rgba(233, 247, 250, 0.5)'
                }
            ]
        }

        const options = {
            legend: {
                display: false
            }
        }

        let rows = this.props.data.map((entry, i) => {
            let date = moment(entry.lab_date).format('MMM D, YYYY')
            let time = moment(entry.lab_date).format('h:mm A')
            return (
                <div className="labRow" key={`${entry.lab_result_id}${i}${new Date()}`}>
                    <div className="rowCell">{entry.lab_result}</div>
                    <div className="rowCell">{date}</div>
                    <div className="rowCell">{time}</div>
                </div>
            )
        } )
        
        
    return (
        <div className="labAccordion">
            
            <div className="labTab">
                <div className="labCellL"><h3>{this.props.data[0].test_name}</h3></div>
                <div className="labCellM"><h3>{this.props.data[0].lab_result}</h3></div>
                <div className="labCellR"><div className="iconContainer" id={`${this.props.id}individualLabArrow`}><ExpandMore onClick={this.changeHidden}/></div></div>
            </div>

            <div className="labDropdown" id={`${this.props.id}labDropdown`}>
                
                <div className="labsGraph">
                    <Line data={data} options={options}/> 
                </div>
                
                <div className="labHeader">
                    <div className="headerCell">Result</div>
                    <div className="headerCell">Date</div>
                    <div className="headerCell">Time</div>
                </div>

                <div className="labRows">
                    {rows}
                </div>

            </div>

        </div>
    )
  }
}
