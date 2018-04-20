import React, { Component } from 'react';
import Groups from './containers/Groups';
import Group from './containers/Group';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Greenhouse from './containers/Greenhouse'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from './actions';
import Grolite from './containers/Grolite';
import  NavBar  from './components/NavBar';


class App extends Component {

  componentDidMount(){
    let jwt = localStorage.getItem('token')

    if (jwt && !this.props.currentUser){
      this.props.getUser(jwt, this.props.history)
    }
  }

  render() {
    return (
      <div>
      <NavBar />
        <Route exact path='/' component={Grolite}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/groups' component={Groups}/>
        <Route exact path='/greenhouse' component={Greenhouse} />
        <Route path="/groups/:groupID" component={Group} />
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    loggenIn: state.loggenIn,
    currentUser: state.currentUser,
    token: state.token
  }
}

export default withRouter(connect(mapStateToProps, {getUser})(App));
