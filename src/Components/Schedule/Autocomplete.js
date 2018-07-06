import React, { Component } from 'react'
import ReactAutoSuggestDropdown from 'react-autosuggest-dropdown-menu'
import axios from 'axios';

class Autosuggest extends Component {
    constructor() {
        super()
        this.state = {
            chosenValue: '',
            searchValue: '',
            showDropdown: false,
            list: []
        }
    }
    
    componentDidMount = () => {
        axios.get('/patients').then(res => {
            let list = res.data.map(val => {
                val.valueToSearch = val.patient_full_name
                return val
            })
            this.setState({ list })
        })
    }
    
    componentWillReceiveProps(newProps) {
        if (this.props.open && !newProps.open) {
            this.setState({
                chosenValue: '',
                searchValue: '',
                showDropdown: false,
                list: []
            })
        }
    }

    chooseDropdownItem = (e, valueSelected, valueObject) => {
        e.preventDefault()
        this.setState({ showDropdown: false, searchValue: valueSelected })
        this.props.getName(valueObject.patient_id)
        console.log(this.state)
    }

    updateSearchValue = e => {
        e.preventDefault()
        this.setState({ searchValue: e.target.value })
    }

    showDropdown = () => {
        this.setState({ showDropdown: true })
    }

    render() {
        return (
            <div className='App'>
                <ReactAutoSuggestDropdown
                    list={this.state.list}
                    showDropdown={this.showDropdown}
                    displayDropdownMenu={this.state.showDropdown}
                    chosenValue={this.state.chosenValue}
                    chooseDropdownItem={this.chooseDropdownItem}
                    updateSearchValue={this.updateSearchValue}
                    searchValue={this.state.searchValue}
                    highlightColour={"#ff9966"}
                />
            </div>
        );
    }
}

export default Autosuggest;