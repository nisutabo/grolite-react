import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logOut } from '../actions';

const NavLabel = styled.label`
  font-family: Helvetica-Light !important;
  font-size: 14px !important;
  color: black !important;
  padding-right: 20px !important;
  padding-left: 20px !important;

`
const GroliteLabel = styled.label`
  font-family: Helvetica-Light !important;
  font-size: 18px !important;
  color: grey !important;
`


class NavBar extends Component {

  render(){

    return (

        <Menu pointing secondary>


          <Menu.Item>
              <NavLink to='/'>
                <GroliteLabel> GROLITE </GroliteLabel>
              </NavLink>
              {this.props.loggedIn ?
                <Container textAlign='right'>
                  <NavLink to='/greenhouse'>
                    <NavLabel> HOME </NavLabel>
                  </NavLink>
                  <NavLink to='/groups'>
                    <NavLabel> GROUPS  </NavLabel>
                  </NavLink>
                  <NavLink to='/logout'>
                    <NavLabel onClick={this.props.logOut}> LOGOUT</NavLabel>
                  </NavLink>
                </Container>
                :
                <Container>
                <NavLink to='/login'>
                  <NavLabel> LOGIN </NavLabel>
                </NavLink>
                <NavLink to='/signup'>
                  <NavLabel> SIGNUP</NavLabel>
                </NavLink>
                </Container>}
            </Menu.Item>

        </Menu>

    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.users.currentUser,
    loggedIn: state.users.loggedIn
  }
}

export default connect(mapStateToProps, {logOut})(NavBar)
