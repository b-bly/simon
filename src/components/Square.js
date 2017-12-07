import React, { Component } from 'react';


export class Square extends Component {
    constructor(props) {
        super(props);
        this.style = props.style;
        this.handleClick = this.handleClick.bind(this);
        this.color = props.color;
    
        
        // {
        //     width: 50,
        //     height: 50,
        //     backgroundColor: 'blue',
        //     position: 'fixed'
        // };
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    handleClick() {
        this.props.handleClick(this.color);
    }
  
    render() {
        return (
            <div style={this.style}
            onClick={ this.handleClick }>
            </div>
        );
    }
}

export function changeColor() {
    
        console.log('working');
        
    
}