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
                width: 100,
                height: 100,
                backgroundColor: 'blue',

            };
        this.board;
        this.boardStyle = [];
        this.createBoard();

    }

    createBoard() {
        const boardArr = [0, 1, 2, 3];
        const colorMap = ['red', 'blue', 'yellow', 'green'];
        const colors = ['rgb(244, 65, 65)', 'rgb(66, 134, 244)', 'rgb(244, 232, 65)', 'rgb(66, 244, 78)'];

        let row = [];

        boardArr.forEach((num, i) => {
            let property = {};
            let style = Object.assign({}, this.squareStyle);
            style.backgroundColor = colors[i];
            property.style = style;
            property.color = colorMap[i];
            
            row.push(property);
            if ((i + 1) % 2 == 0) { //row end
                this.boardStyle.push(row);
                row = [];
            }
        });
    }
    handleClick(color) {
        console.log(color);
        
    }
    componentDidMount() {
        //this.createBoard();
    }
    componentWillUnmount() {
        //this.updateCanvas();
    }

    render() {
        //[[style ],[style ]], [[], []] structure of this.boardStyle
        //repeat 2 squares
        //repeat 2 rows
    
        const rows = this.boardStyle.map((row, i) =>
            <SquareRow key={i.toString()}
                row={row}
                handleClick={this.handleClick} 
                />
        );

        return (
            <div className={'container'} style={this.center}>
                {rows}
                {/* <SquareRow style={this.boardStyle[0]} /> */}
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
                    handleClick={ this.handleClick } />
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