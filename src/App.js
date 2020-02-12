import React, { Component } from 'react';
import './App.css';
import ToDoApp from './components/todo/ToDoApp.js';

class App extends Component{

  render(){
    return (
      <div className="App">
        <ToDoApp />
      </div>
    );
  }
}

export default App;
