import React, { Component } from 'react';


export class Square extends Component {
    constructor(props) {
        super(props);
        this.color = this.props.color;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        //console.log('handle click called square');
        
        this.props.handleClick(this.color);
    }
  
    render() {
    
        return (
            <div style={this.props.style}
            onClick={ this.handleClick }>
            </div>
        );
    }
}

