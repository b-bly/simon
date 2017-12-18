import React, { Component } from 'react';

import '../styles/Game.css';

export class Square extends Component {
    constructor(props) {
        super(props);
        this.color = this.props.color;
        this.handleMouseUp = this.handleMouseUp.bind(this);
        
    }

  
    handleMouseUp () {
        this.props.handleMouseUp(this.color);
    }
  
    render() {
    console.log('Square props');
    console.log(this.props);
    
        return (
            <div className={this.props.className}
           
            onMouseUp={ this.handleMouseUp }>
            </div>
        );
    }
}

