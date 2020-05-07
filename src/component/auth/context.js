/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable no-undefined */
import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import {Link , NavLink} from 'react-router-dom';
import { useStore } from 'react-hookstore';
import Spinner from '../spinner/spinner.js';
import { connect } from 'react-redux';
import { logUp } from '../../action/authAction.js';

const If = props => {
  return props.condition ? props.children : null;
};

const API = 'https://food--ashurs.herokuapp.com';
const SECRET = process.env.SECRET;
// console.log(API,  SECRET);

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      loading: false,
      user: {},
    };
  }


  validateToken = token =>{
    try {
      let user = jwt.verify(token, 'ashurFood');
      console.log('user', user);
      this.setLoginState(true, token, user);
    } catch {
      this.setLoginState(false, null, {});
      console.error('token invalid');
    }
  }
  setLoginState = (loggedIn, token, user) =>{
    this.setState({ loading: false});
    cookie.save('auth', token);
    this.setState({token, loggedIn, user});
    console.log('this.state',this.state);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  componentDidMount(){
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.validateToken(this.props.token);

  }
  render(){
    return (
      <React.Fragment>
        <If condition={this.state.loading}> <Spinner /> </If>
        <If condition={!this.state.loading}>


          <LoginContext.Provider value={this.state}>
            {this.props.children}
          </LoginContext.Provider>
        </If>
      </React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
  user: state.authReducer.user,
  token: state.authReducer.token,
});
const mapDispatchToProps = { logUp };

export default connect(mapStateToProps, mapDispatchToProps)(LoginProvider);

// export default ;