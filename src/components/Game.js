import React, { Component } from 'react';

import { Square } from './Square';

// bootstrap
import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
// const Grid = ReactBootstrap.Grid;
// const Row = ReactBootstrap.Row;
// const Col = ReactBootstrap.Col;

// This was helpful: 
// https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753
export class Game extends Component {
    constructor(props) {
        super(props);
        this.style = {
            position: 'relative',
            backgroundColor: 'gray',
            padding: 10,
            width: 500,
            height: 500
        };
        this.center = {
            display: 'flex',
            justifyContent: 'center'
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {

    }
    render() {
        return (
            <div>
                <div className={'container'} style={ this.center }>
                    <div className={'col text-center'} style={this.style}>
                        <Square />
                    </div>
                </div>
            </div>
        );
    }
}

function rect(props) {
    const { ctx, x, y, width, height } = props;
    ctx.fillRect(x, y, width, height);
}