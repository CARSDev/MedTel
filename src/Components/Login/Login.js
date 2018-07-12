import React, { Component } from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Lock from '@material-ui/icons/Lock'
import Person from '@material-ui/icons/Person'
import Grade from '@material-ui/icons/Grade'
import ShowChart from '@material-ui/icons/ShowChart'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import './Login.css'

class Login extends Component {
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

  login = () => {
    axios.post('/auth/login', { username: this.state.username, password: this.state.password })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/schedule')
        }
      })
  }
  
  render() {
    return (
      <div className = "loginContainer">
      
        <div className="loginLeft">
          <h1>MedTel</h1>
          
          <div className="loginLeftContent">
            
            <div className="contentCard">
              <Grade
                style={{
                  height: '100px',
                  width: '100px',
                  float: 'left',
                  color: '#ef652f'
                }}
                />
              <h2>Best Medical Charting App - 2018</h2>
              <h4 className = "alignRight">All the doctors near you, plus the ones from Harvard, China, and Forbes Magazine, got together and took a vote. We won! All experts say this is the best medical charting app of 2018!</h4>
            </div>

            <div className="contentCard">
              <ShowChart
                style={{
                  height: '100px',
                  width: '100px',
                  float: 'right',
                  color: '#ef652f'
                }}
                />
              <h2>Perfect Metrics... Perfect Growth</h2>
              <h4 className="alignLeft">All medical professionals want to grow quickly and steeply, then drop back to almost where they started, and then shoot off to unlimited profits. Our metrics GUARANTEE you that trajectory.</h4>
            </div>
            
            </div>

          
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
                      padding: '0px 0px 3px 5px',
                      color: '#3E8EC7'
                    }}
                  />
                  <input type="username" placeholder="Username" onChange={ (e) => this.updateInput(e, 'username') }/>
                </div>

                <div className="loginPassword">
                  <Lock
                    style={{
                      padding: '0px 0px 3px 5px',
                      color: '#3E8EC7'
                    }}
                  />
                  <input type="password" placeholder="Password" onChange={(e) => this.updateInput(e, 'password')}/>
                </div>

                <div className="circleButton" onClick={this.login}>
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

export default withRouter(Login)
