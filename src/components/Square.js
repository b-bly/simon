import React, { Component } from 'react';

import '../styles/Game.css';

export class Square extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.color = this.props.color;
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);

    }

    handleMouseUp() {
        this.props.handleMouseUp(this.color);
    }
    handleMouseDown() {
        this.props.handleMouseDown(this.color);
    }

    render() {
        console.log('Square props');
        console.log(this.props);

        return (
            <div className={this.props.className}
                style={this.props.style}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}>
            </div>
        );
    }
}

