import React, { Component } from 'react';
// bootstrap
import { Button, ListGroup } from 'react-bootstrap';

export class StartButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.start = this.start.bind(this);
    }
    start() {
        this.props.start();

    }
    render() {

        return (
            <Button id={'start-button'}
                bsStyle="primary"
                className={this.props.className}
                onClick={() => { this.start() }}
            >{this.props.startText}</Button>
        );
    }
}
