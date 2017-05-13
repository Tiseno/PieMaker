import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import Header from './Header';
import PieMaker from './PieMaker';
import About from './About';
import Footer from './Footer';

export default class App extends Component {
    render () {
        return (
          <div className='content'>
            <Header />
            <Route exact path='/' component={PieMaker} />
            <Route path='/about' component={About} />
          </div>
        );
    }
}
