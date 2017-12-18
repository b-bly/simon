import React, { Component } from 'react';

export class Message extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.style = {};
    }

    render() {
        this.style = Object.assign({}, this.props.style);
        this.style.fontSize = '30px';
        return (
            <div style={this.style}> {this.props.message}
            </div>
        )
    }
}