import React, { Component } from 'react';

import { CONSTANTS } from './Constants';
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
        const squareStyle = { width: CONSTANTS.SQUARE_WIDTH, height: CONSTANTS.SQUARE_WIDTH };

        return (
            <div className={this.props.className}
                style={squareStyle}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}>
            </div>
        );
    }
}

