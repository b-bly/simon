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
const boardArr = [0, 1, 2, 3];
const colorMap = ['red', 'blue', 'yellow', 'green'];
const colors = ['rgb(244, 65, 65)', 'rgb(66, 134, 244)', 'rgb(244, 232, 65)', 'rgb(66, 244, 78)'];
const litColors = ['rgb(255, 153, 153)', 'rgb(160, 196, 255)', 'rgb(252, 246, 161)', 'rgb(153, 255, 159)'];
const INTERVAL = 1000;

export class Game extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.start = this.start.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

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
        this.state = {
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: []
        }

    }

    createBoard() {//board obj = {style, color, lit(boolean)}
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

        return {
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: boardStyle
        };
        console.log('createBoard called');
    }

    updateBoard(state) {
        this.setState(state);
    }

    handleClick(color) {
        //state: {color: '', style: {backgroundColor: ''}}
        const stateCopy = this.createBoard();

        const boardStyle = stateCopy.boardStyle.map((row, i) => {
            const updatedRow = row.map((square, j) => {
                console.log('handleClick, square: ');
                console.log(square);

                let squareCopy = Object.assign({}, square);
                if (square.color == color) {
                    //got error when assigning directly to square.style.backgroundColor
                    // Cannot assign to read only property 'backgroundColor' of object
                    squareCopy.style.backgroundColor = litColors[i * 2 + j]; //change 2d array index to 1D array index                   

                }
                return squareCopy;
            });
            return updatedRow;
        });
        this.setState({
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: boardStyle
        });
        // console.log('handle click Game state: ');
        // console.log(this.state.boardStyle[0][0]);

    }

    changeColor(color, lit) {
        const stateCopy = this.createBoard();
        const boardStyle = stateCopy.boardStyle.map((row, i) => {
            const updatedRow = row.map((square, j) => {
                console.log('handleClick, square: ');
                console.log(square);
                let squareCopy = Object.assign({}, square);
                if (square.color == color) {
                    //got error when assigning directly to square.style.backgroundColor
                    // Cannot assign to read only property 'backgroundColor' of object
                    if (lit == true) { //change to lit color
                        squareCopy.style.backgroundColor = litColors[i * 2 + j]; //change 2d array index to 1D array index                    
                    } else {
                        squareCopy.style.backgroundColor = colors[i * 2 + j]; //change 2d array index to 1D array index                    
                    }
                }
                return squareCopy;
            });
            return updatedRow;
        });
        this.setState({
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: boardStyle
        });
        // console.log('handle click Game state: ');
        // console.log(this.state.boardStyle[0][0]);
    }

    start() {
        console.log('start called');
        const sequence = ['red'];       
        setTimeout(() => {
            this.changeColor('red', true);
        }, 0);
        setTimeout(() => {
            this.changeColor('red', false);
        }, INTERVAL);
    }

    handleMouseUp(color) {
        console.log('mouseUp color: ');
        console.log(color);
        this.changeColor(color, false);
    }
    componentWillMount() {
        const state = this.createBoard();
        this.updateBoard(state);
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
                handleClick={this.handleClick} 
                handleMouseUp={this.handleMouseUp }/>
        );
        const row2 = this.state.boardStyle[1].map((square, i) =>
            <Square key={i.toString()}
                style={square.style}
                color={square.color}
                handleClick={this.handleClick}
                handleMouseUp={this.handleMouseUp} />
        );
        console.log('game render, state: ');
        console.log(this.state.boardStyle[0][0].style);
        const button = <Button bsStyle="primary"
        >Primary</Button>;

        return (
            <div>
                <div className={'container'} style={this.center}>
                    <div style={rowStyle}>
                        {row1}
                        {row2}
                    </div>
                </div>
                <div style={this.center}>
                    <StartButton start={this.start} />
                </div>
            </div>
        );
    }
}

class StartButton extends Component {
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
            <Button bsStyle="primary"
                onClick={() => { this.start() }}
            >Start</Button>);
    }
}

// class SquareRow extends Component {
//     constructor(props) {
//         super(props);
//         this.props = props;
//         this.row = props.row;
//         this.handleClick = this.handleClick.bind(this);

//     }

//     handleClick(color) {
//         this.props.handleClick(color);
//     }

//     render() {
//         const style = {
//             display: 'flex',
//             flexDirection: 'row'
//         };

//         const squares = this.row.map((square, i) =>
//             <div key={i.toString()} style={style}>
//                 <Square key={i.toString()}
//                     style={square.style}
//                     color={square.color}
//                     handleClick={this.handleClick} />
//             </div>
//         );


//         return (
//             <div>
//                 {squares}
//             </div>
//         );
//     }
// }

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