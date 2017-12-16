import React, { Component } from 'react';

import '../styles/Game.css';

export class Square extends Component {
    constructor(props) {
        super(props);
        this.color = this.props.color;
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        
    }

    handleClick() {
        //console.log('handle click called square');
        
        this.props.handleClick(this.color);
    }
    handleMouseUp () {
        this.props.handleMouseUp(this.color);
    }
  
    render() {
    console.log('Square props');
    console.log(this.props);
    
        return (
            <div className={this.props.className}
            onMouseDown={ this.handleClick }
            onMouseUp={ this.handleMouseUp }>
            </div>
        );
    }
}

