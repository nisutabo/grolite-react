import React from 'react'
import {signUp} from '../actions'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { Container } from 'semantic-ui-react';


const RowLabel = styled.label`
  font-family: Helvetica-Light !important;
  font-size: 12px !important;
  color: black !important
`

const FormLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 9px !important;
  color: black !important
`

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    location: ""
  }

  handleChange = (event)=> {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    this.props.signUp(this.state.username, this.state.password, this.state.location, this.props.history)
  }

  handleLocationSelection = (e) => {
    this.setState({location: e.target.value})
  }


  render(){

    const locations = ['New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'San Francisco, CA', 'London, UK']

    const locationOptions = locations.map((location) => {
      return <option key={locations.indexOf(location)} name='location' value={location}><FormLabel>{location}</FormLabel></option>
    })

    return (
      <Container textAlign='center'>
        <label><RowLabel>Username:</RowLabel></label>
        <br></br>
        <br></br>
        <input name="username" value={this.state.username} onChange={this.handleChange}/>
        <br></br>
        <br></br>
        <label><RowLabel>Password:</RowLabel></label>
        <br></br>
        <br></br>
        <input name="password" type='password' value={this.state.password} onChange={this.handleChange}/>
        <br></br>
        <br></br>
        <label><FormLabel>Location:</FormLabel></label>
        <br></br>
        <br></br>
        <select onChange={this.handleLocationSelection}>{locationOptions}</select>
        <br></br>
        <br></br>
        <button onClick={this.handleSubmit}><RowLabel>Sign Up!</RowLabel></button>
      </Container>
    )
  }
}

export default connect(null, {signUp})(Signup)
