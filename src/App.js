import React, { Component } from 'react';

//components
import { Game } from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello world</h1>
        <Game />
      </div>
    );
  }
}

export default App;
