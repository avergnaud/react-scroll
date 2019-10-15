import React, { Component } from 'react';
import ScrollingList from './ScrollingList/ScrollingList';
import { throwStatement } from '@babel/types';
const uuidv4 = require('uuid/v4');

class App extends Component {

  state = {
    persons: [uuidv4(), uuidv4(), uuidv4()],
    adjustScroll: true
  }

  addOne = () => {
    const newPersons = [...this.state.persons];
    newPersons.push(uuidv4());
    this.setState({ persons: newPersons });
  }

  toggleAdjustScroll = () => {
    let newScroll = !this.state.adjustScroll;
    this.setState({ adjustScroll: newScroll });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>{this.state.adjustScroll ? 'scroll adjusted' : 'scroll not adjusted'}</h1>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <button className="btn btn-primary local" onClick={this.addOne}>Add</button>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-success local" onClick={this.toggleAdjustScroll}>
              {this.state.adjustScroll ? 'disable adjust scroll' : 'adjust scroll'}
            </button>
          </div>
        </div>
        <ScrollingList 
          list={this.state.persons.slice()} 
          adjustScroll={this.state.adjustScroll}/>
      </div>
    );
  }
}

export default App;
