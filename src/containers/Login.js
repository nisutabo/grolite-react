import React from 'react'
import { logIn } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Container } from 'semantic-ui-react';

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (event)=> {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    this.props.logIn(this.state.username, this.state.password, this.props.history)
  }

  render(){
    const RowLabel = styled.label`
      font-family: Helvetica-Light !important;
      font-size: 12px !important;
      color: black !important
    `
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
        <button onClick={this.handleSubmit}><RowLabel>Log In!</RowLabel></button>
      </Container>
    )
  }
}

export default connect(null, {logIn})(Login)
