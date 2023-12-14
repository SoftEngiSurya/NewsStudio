import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';

import React, { Component } from 'react'

export default class App extends Component {
  thisIsVariableInClassBase = ' Variable Class Base Components'
  render() {
    return (
      <div>
        <NavBar/>
        <News/>
      </div>
    )
  }
}


