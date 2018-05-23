import React, { Component } from 'react';
// bootstrap
import { Button } from 'react-bootstrap';

export class QuitButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.reset = this.reset.bind(this);
    }
    reset(message, won) {
        this.props.reset(message, won);
    }
    render() {

        return (
            <div>
                <Button bsStyle="warning"
                
                    className={'quit-button'}
                    onClick={() => { this.reset('Game over', false) }}
                >Quit</Button>
            </div>
        );
    }
}