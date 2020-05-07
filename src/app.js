/* eslint-disable no-unused-vars */
import React ,{useState} from 'react';
import {Route} from 'react-router-dom';
import ChatCh from './component/chat/chat.js';
import Recipients from './component/resipient/resipient.js';
import Donor from './component/donor/donor.js';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
import Profile from './component/profile.js';
import SettingsProvider from './component/auth/context.js';
import LoginContext from './component/auth/context.js';
// import Login from './component/auth/login.js';
import Auth from './component/auth/auth.js';
// import Logup from './component/auth/logup.js';
// import SignForm from '../src/component/sign-forms/signForm.js';
import SlideTwo from '../src/component/slideshowTwo/slideshowTwo.js';
// import Header from './component/header/header.js';
import GoogleLog from './component/auth/login-google.js';
import About from '../src/component/aboutus/about.js';
import SlideShow from '../src/component/slideShow/slideShow.js';
// import {When} from '../src/component/if';
import { Provider } from 'react-redux';
import store from './store/';


export default function App (){

  const [isToggle , setisToggle] = useState(false);
  const handleToggle = state =>{
    setisToggle(!isToggle);
  };

  return (
    <Provider store={store}>
      <LoginContext>
        <Route exact path= '/'>
          <Header />
          <Auth capability='recipient'>
            <SettingsProvider>
              <Recipients />
            </SettingsProvider>
          </Auth>
          <Auth capability='donor'>
            <SettingsProvider>
              <Donor />
            </SettingsProvider>
          </Auth>
          <SlideTwo/>
          <SlideShow/>
          <About />
          <Footer/>
        </Route>
        <Route exact path= '/profile'>
          <Profile />
          <Footer/>
        </Route>

      </LoginContext>
    </Provider>
  );
}