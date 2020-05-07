/* eslint-disable no-unused-vars */
import React from 'react';
// import { LoginContext } from './context.js';
import { connect } from 'react-redux';
import { logUp } from '../../action/authAction.js';
const If = props => {
  return props.condition ? props.children : null;
};

class Auth extends React.Component{
  // static contextType = LoginContext;

  render() {
    let okToRender = false;

    try {
      okToRender =
          this.props.loggedIn &&
            (this.props.capability
              ? this.props.user.capabilities.includes(this.props.capability)
              : true);
    } catch {
      console.warn('not authorized to do that');
    }
    return (
      <If condition={okToRender}>
        <div>{this.props.children}</div>
      </If>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
  user: state.authReducer.user,
});
const mapDispatchToProps = { logUp };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);