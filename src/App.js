import React, { Component } from 'react';
import './styles/App.css';
//components
import { Game } from './components/Game';


// bootstrap
// import { Button } from 'react-bootstrap';
// import { Grid } from 'react-bootstrap';
// import { Row } from 'react-bootstrap';
// import { Col } from 'react-bootstrap';

class App extends Component {


  render() {
    const center = {
      display: 'flex',
      justifyContent: 'center'
    }
    return (
      <div className="App App-title">
        <h1 style={center}>Simon</h1>
        <Game />
      </div>
    );
  }
}

export default App;
