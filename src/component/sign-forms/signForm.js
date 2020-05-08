/* eslint-disable no-unused-vars */
import React from 'react';
import './signForm.scss';
import SignInForm from '../auth/login.js';
import SignUpForm from '../auth/logup.js';
import { connect } from 'react-redux';
const If = props => {
  return props.condition ? props.children : null;
};
class Form extends React.Component{
  render(){
    return (
      <React.Fragment>
        <If condition={this.props.loggedIn}>
          <button onClick={this.props.logout} >Log Out!</button>
        </If>

        <If condition={!this.props.loggedIn}>
          <section className="sign-bg-section">
            <div className="login-wrap">
              <button onClick={this.props.close} className="sign-close">X</button>
              <div className="login-html"  action="https://github.com/Food-Ashur-s/Food-Ashurs-Full-App">
                <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
                <div className="login-form">
                  <SignUpForm/>
                  <SignInForm/>
                </div>
              </div>
            </div>
          </section>
        </If>
      </React.Fragment>
    );

  }
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
  user: state.authReducer.user,
});
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
