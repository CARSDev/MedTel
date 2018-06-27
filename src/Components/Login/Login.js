import React, { Component } from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Lock from '@material-ui/icons/Lock'
import Person from '@material-ui/icons/Person'
import './Login.css'

export default class Login extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: ''
    }
  }
  
  updateInput = (e, property) => {
    this.setState({
      [property]: e.target.value
    })
  }
  
  render() {
    return (
      <div className = "loginContainer">
      
        <div className="loginLeft">
          <h1>MedTel</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
        </div>

        <div className="loginRight">
          <div className="filter">
            <div className="loginBox">
              
              <h2>MedTel</h2>

              <div className="lowerBox">
                
                <h3>Please Login</h3>
                
                <div className="loginUsername">
                  <Person
                    style={{
                      padding: '5px 5px 8px 5px',
                      position: 'absolute',
                      left: '9.5%',
                      color: '#3E8EC7'
                    }}
                  />
                  <input type="username" placeholder="Username" onChange={ (e) => this.updateInput(e, 'username') }/>
                </div>

                <div className="loginPassword">
                  <Lock
                    style={{
                      padding: '5px 5px 8px 5px',
                      position: 'absolute',
                      left: '9.5%',
                      color: '#3E8EC7'
                    }}
                  />
                  <input type="password" placeholder="Password" onChange={(e) => this.updateInput(e, 'password')}/>
                </div>

                <div className="circleButton">
                  <PlayArrow
                    style={{
                      color: "#fff",
                      height: '36px',
                      width: '36px'
                    }} />
                  </div>

                <h4>
                  Register?
                </h4>
                
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}
