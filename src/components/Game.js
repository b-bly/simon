import React, { Component } from 'react';

import { Square } from './Square';
import { changeColor } from './Square';

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
        this.handleClick = this.handleClick.bind(this);
        // this.style = {
        //     position: 'relative',
        //     backgroundColor: 'gray',
        //     padding: 10,
        //     width: 500,
        //     height: 500
        // };
        this.center = {
            display: 'flex',
            justifyContent: 'center'
        }
        this.squareStyle =
            {
                width: 100,
                height: 100,
                backgroundColor: 'blue',

            };


        this.createBoard();
    }

    createBoard() {//board obj = {style, color, lit(boolean)}
        const boardArr = [0, 1, 2, 3];
        const colorMap = ['red', 'blue', 'yellow', 'green'];
        const colors = ['rgb(244, 65, 65)', 'rgb(66, 134, 244)', 'rgb(244, 232, 65)', 'rgb(66, 244, 78)'];
        const litColors = ['rgb(255, 153, 153)', 'rgb(160, 196, 255)', 'rgb(252, 246, 161)', 'rgb(153, 255, 159)'];

        let row = [];
        const boardStyle = [];
        boardArr.forEach((num, i) => {
            let property = {};
            let style = Object.assign({}, this.squareStyle);
            property.color = colorMap[i];

            style.backgroundColor = colors[i];

            property.style = style;

            row.push(property);
            if ((i + 1) % 2 == 0) { //row end
                boardStyle.push(row);
                row = [];
            }
        });

        this.state = {
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: boardStyle
        }
        console.log('createBoard called');

    }
    handleClick(color) {
        const boardArr = [0, 1, 2, 3];
        const colorMap = ['red', 'blue', 'yellow', 'green'];
        const colors = ['rgb(244, 65, 65)', 'rgb(66, 134, 244)', 'rgb(244, 232, 65)', 'rgb(66, 244, 78)'];
        const litColors = ['rgb(255, 153, 153)', 'rgb(160, 196, 255)', 'rgb(252, 246, 161)', 'rgb(153, 255, 159)'];

        let row = [];
        const boardStyle = [];
        boardArr.forEach((num, i) => {
            let property = {};
            let style = Object.assign({}, this.squareStyle);
            property.color = colorMap[i];

            style.backgroundColor = litColors[i];

            property.style = style;

            row.push(property);
            if ((i + 1) % 2 == 0) { //row end
                boardStyle.push(row);
                row = [];
            }
        });

        this.setState({
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: boardStyle
        });
        console.log('handle click Game state: ');
        console.log(this.state.boardStyle[0][0]);

    }
    componentDidMount() {
        //this.createBoard();
        //this.createBoard();
    }
    componentWillUnmount() {
        //this.updateCanvas();
    }

    render() {
        const rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: 220
        };

        const row1 = this.state.boardStyle[0].map((square, i) =>

            <Square key={i.toString()}
                style={square.style}
                color={square.color}
                handleClick={this.handleClick} />
        );
        const row2 = this.state.boardStyle[1].map((square, i) =>

            <Square key={i.toString()}
                style={square.style}
                color={square.color}
                handleClick={this.handleClick} />
        
        );
        console.log('game render, state: ');
        console.log(this.state.boardStyle[0][0].style);


        return (
            <div className={'container'} style={this.center}>
                <div style={rowStyle}>
                  {row1}
                  {row2}
                </div>
            </div>

        );
    }
}

class SquareRow extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.row = props.row;
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(color) {
        this.props.handleClick(color);
    }

    render() {
        const style = {
            display: 'flex',
            flexDirection: 'row'
        };

        const squares = this.row.map((square, i) =>
            <div key={i.toString()} style={style}>
                <Square key={i.toString()}
                    style={square.style}
                    color={square.color}
                    handleClick={this.handleClick} />
            </div>
        );


        return (
            <div>
                {squares}
            </div>
        );
    }
}

//Hard code version of what maps create
        // <div className={'container'} style={this.center}>

            //     <div className={'row'}>
            //         {this.boardStyle[0].map((square, i) =>
            //             <Square key={i.toString()} style={square.style} />)
            //         }
            //     </div>
            //     <div className={'row'}>

            //             {this.boardStyle[1].map((square, i) =>
            //                 <Square key={i.toString()} style={square.style} />)
            //             }

            //     </div>
            // </div>