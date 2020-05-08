/* eslint-disable no-unused-vars */
import React  from 'react';
import {Route} from 'react-router-dom';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
import Profile from './component/profile.js';
import Auth from './component/auth/auth.js';
import SlideTwo from '../src/component/slideshowTwo/slideshowTwo.js';
import About from '../src/component/aboutus/about.js';
import SlideShow from '../src/component/slideShow/slideShow.js';
import { Provider } from 'react-redux';
import store from './store/';

export default function App (){
  return (
    <Provider store={store}>
      <Route exact path= '/'>
        <Header />
        <Auth />
        <SlideTwo/>
        <SlideShow/>
        <About />
        <Footer/>
      </Route>
      <Route exact path= '/profile'>
        <Profile />
        <Footer/>
      </Route>
    </Provider>);
}