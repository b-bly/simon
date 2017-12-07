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
        this.squareStyle =
            {
                width: 50,
                height: 50,
                backgroundColor: 'blue',
                display: 'flex'
            };
        this.board;
        this.boardStyle = [];
        this.createBoard();

    }

    createBoard() {
        const boardArr = [0, 1, 2, 3];
        const colors = ['red', 'blue', 'yellow', 'green'];
        let row = [];

        boardArr.forEach((num, i) => {
            let property = {};
            let style = Object.assign({}, this.squareStyle);
            style.backgroundColor = colors[i];
            property.style = style;
            row.push(property);
            if ((i + 1) % 2 == 0) { //row end

                this.boardStyle.push(row);
                row = [];
            }
        });
        // this.board = squareProperties.map((property, i) =>
        //     // Correct! Key should be specified inside the array.

        //     <Square key={i.toString()}
        //         style={property.style}
        //         properties={this.properties} />
        // );


    }

    componentDidMount() {
        //this.createBoard();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {

    }
    render() {
        //[[],[]], [[], []]
        //repeat 2 squares

        const squares = this.boardStyle[0].map((square, i) =>
            <Square style={square.style} />
        );


        //repeat 2 rows
        return (


            <div className={'container'} style={this.center}>
                <div className={'row'}>
                    {this.boardStyle[0].map((square, i) =>
                        <Square key={i.toString()} style={square.style} />)
                    }
                </div>
                <div className={'row'}>
                   
                        {this.boardStyle[1].map((square, i) =>
                            <Square key={i.toString()} style={square.style} />)
                        }
                    
                </div>
            </div>
            // <div>
            //     <div className={'container'} style={this.center}>
            //         <div className={'row'}>
            //             <div className={'col text-center'} style={this.style}>
            //                 <Square /><Square />
            //             </div>
            //         </div>
            //         <div className={'row'}>
            //             <div className={'col text-center'} style={this.style}>
            //                 <Square /><Square />
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

class Testing {
    constructor(props) {
        this.props = props;
    }
    render() {

        return (<div>Worked</div>);
    }
}