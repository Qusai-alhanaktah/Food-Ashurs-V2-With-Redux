/* eslint-disable no-undefined */
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGUP = 'LOGUP';


export const logIn = (username, password) => dispatch => {
  fetch('https://food--ashurs.herokuapp.com/signin', {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    headers: new Headers({
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
    }),
  })
    .then(response =>  response.text())
    .then(token => validateToken(token))
    .then(data =>
      dispatch ({
        type: LOGIN,
        payload: data,
      }),
    );
};
export const logUp = (username, password, email, role) => dispatch => {
  let newBody = {username, password, email, role};
  fetch('https://food--ashurs.herokuapp.com/signup', {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: newBody ? JSON.stringify(newBody) : undefined,
  })
    .then(response =>  response.text())
    .then(data => generateToken(newBody))
    .then(data =>
      dispatch ({
        type: LOGUP,
        payload: data,
      }),
    );
};
const generateToken = user => {
  console.log('user', user);

  let userData = {
    username: user.username,
    userEamil: user.email,
    capabilities: user.role,
  };
  let token = jwt.sign(userData, 'ashurFood');
  return setLoginState(true, token, user);
  //   validateToken(token);
  console.log('token', token, 'user', user);

};

const validateToken = token =>{
  try {
    let user = jwt.verify(token, 'ashurFood');
    console.log('user', user);
    return setLoginState(true, token, user);
  } catch {
    console.error('token invalid');
    return setLoginState(false, null, {});
  }
};
const setLoginState = (loggedIn, token, user) =>{
  cookie.save('auth', token);
  console.log('loggedIn, token, user',loggedIn, token, user);
  localStorage.setItem('userInfo', JSON.stringify(user));
  return({token, loggedIn, user,loading: false});
};
export const logOut = () => dispatch => {
  localStorage.clear();
  dispatch ({
    type: LOGOUT,
    payload: setLoginState(false, null, {}),
  });
};


// componentDidMount(){
//   const qs = new URLSearchParams(window.location.search);
//   const cookieToken = cookie.load('auth');
//   const token = qs.get('token') || cookieToken || null;
//   validateToken(token);
// }