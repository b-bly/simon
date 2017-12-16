import React, { Component } from 'react';
import { Square } from './Square';

// bootstrap
import { Button, ListGroup } from 'react-bootstrap';
// import { Grid } from 'react-bootstrap';
// import { Row } from 'react-bootstrap';
// import { Col } from 'react-bootstrap';
// const Grid = ReactBootstrap.Grid;
// const Row = ReactBootstrap.Row;
// const Col = ReactBootstrap.Col;
import swal from 'sweetalert2';

// This was helpful: 
// https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753
const boardArr = [0, 1, 2, 3];
const colorMap = ['red', 'blue', 'yellow', 'green'];
const colors = ['rgb(255, 33, 0)', 'rgb(0, 97, 255)', 'rgb(255, 238, 0)', 'rgb(0, 255, 17)'];
const litColors = ['rgb(255, 153, 153)', 'rgb(160, 196, 255)', 'rgb(252, 246, 161)', 'rgb(153, 255, 159)'];
const INTERVAL = 1000;
const INTERVAL_SPACING = 100;

export class Game extends Component {
    constructor(props) {
        super(props);
        //bind this is needed for functions being called from child components
        this.handleClick = this.handleClick.bind(this);
        this.start = this.start.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.generateSequence = this.generateSequence.bind(this);
        this.reset = this.reset.bind(this);

        this.center = {
            display: 'flex',
            justifyContent: 'center'
        }
        this.squareStyle =
            {
                width: 100,
                height: 100,
                backgroundColor: 'blue',
                borderRadius: 10,
                margin: 4,
                display: 'flex'
            };
        this.state = {
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: [],
            sequence: [],
            sequenceLength: 1,
            showStart: true,
            sequenceIndex: 0,
            message: 'Click start',
            startText: 'Start'
        }

    }

    createBoard() { //board obj = {style, color, lit(boolean)}
        let row = [];
        const boardStyle = [];
        boardArr.forEach((num, i) => {
            let property = {};
            let style = Object.assign({}, this.squareStyle);
            property.color = colorMap[i];
            style.backgroundColor = colors[i];
            property.style = style;
            row.push(property);
            if ((i + 1) % 2 === 0) { //row end
                boardStyle.push(row);
                row = [];
            }
        });

        return {
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: boardStyle
        };
    }

    updateBoard(state) {
        this.setState(state);
    }

    handleClick(color) {
        //state: {color: '', style: {backgroundColor: ''}}
        const stateCopy = this.createBoard();
        const boardStyle = stateCopy.boardStyle.map((row, i) => {
            const updatedRow = row.map((square, j) => {
                let squareCopy = Object.assign({}, square);
                if (square.color === color) {
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
                let squareCopy = Object.assign({}, square);
                if (square.color === color) {
                    //got error when assigning directly to square.style.backgroundColor
                    // Cannot assign to read only property 'backgroundColor' of object
                    if (lit === true) { //change to lit color
                        squareCopy.style.backgroundColor = litColors[i * 2 + j]; //change 2d array index to 1D array index                    
                    } else {
                        squareCopy.style.backgroundColor = colors[i * 2 + j]; //change 2d array index to 1D array index                    
                    }
                }
                return squareCopy;
            });
            return updatedRow;
        });
        console.log('changeColor, boardStyle: ');
        console.log(boardStyle);

        this.setState({
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: boardStyle
        });
        // console.log('handle click Game state: ');
        // console.log(this.state.boardStyle[0][0]);
    }

    start() {
        console.log('start called');
        this.generateSequence(); //calls playSequence() as callback
        this.squareStyle.display = 'flex';
    }
    generateSequence() {
        console.log('generateSequence called');

        //random sequence of colors
        let sequenceLength = this.state.sequenceLength;
        const sequence = [];
        for (let i = 0; i < sequenceLength; i++) {
            const random = Math.floor(Math.random() * 4); //random color
            const color = colorMap[random];
            sequence.push(color);
        }
        //wait until player completes correct sequence to update sequenceLength
        //or when it is displayed to the user it is one longer than the current sequence
        //sequenceLength++;
        this.setState({
            sequence: sequence,
            showStart: false,
            message: ''

        }, this.playSequence(sequence));
    }
    playSequence(sequence) {
        console.log('playSequence called');
        console.log('sequence: ');
        console.log(sequence);

        //const sequence = this.state.sequence;

        sequence.forEach((color, i) => {
            setTimeout(() => {
                this.changeColor(color, true);
            }, INTERVAL * i + INTERVAL_SPACING * i);
            setTimeout(() => {
                this.changeColor(color, false);
            }, INTERVAL * i + INTERVAL);
        });
    }

    handleMouseUp(color) {

        this.changeColor(color, false);
        //checkSelection
        this.checkSelection(color);
    }
    checkSelection(color) {
        //check if correct color was clicked on mouseUp
        //if it's the last color in the sequence, play a new sequence
        // if wrong, game over message, show start
        let sequenceIndex = this.state.sequenceIndex;
        const correctColor = this.state.sequence[sequenceIndex];
        const sequenceLength = this.state.sequence.length;
        let message = '';
        if (color === correctColor) {
            sequenceIndex++;
            console.log('correct selection ');
            this.setState({
                sequenceIndex: sequenceIndex
            })
            //won current round
            if (sequenceIndex === sequenceLength) {
                console.log('end of sequence');
                message = 'Click start';
                this.reset(message, true);

            }
        } else { //GAME OVER
            console.log('Game over');
            message = 'Game over';

            // this.squareStyle.display = 'none'; //remember to change this back to visible
            this.reset(message, false);
        }
    }
    reset(message, won) {
        if (won === true) {
            console.log('reset, won = true');
            const sequenceLength = this.state.sequenceLength + 1;

            swal({
                title: 'Nice!',
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Play next level',
                showCancelButton: true,

                cancelButtonColor: '#d33',
                cancelButtonText: 'Not now'
            }).then((result) => {
                if (result.value === true) {
                    this.start();
                }
            });

            this.setState({
                sequenceIndex: 0,
                showStart: true,
                message: message,
                sequenceLength: sequenceLength,
                startText: 'play'
            });
        } else {
            console.log('reset, won = false');

            this.setState({
                sequenceIndex: 0,
                showStart: true,
                message: message,
                sequenceLength: 1
            });
            swal({
                title: 'Game over',
                type: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'New game',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Not now'

            }).then((result) => {
                if (result.value === true) {
                    this.start();
                }
            }
                );
        }
    }
    componentWillMount() {
        const state = this.createBoard();
        this.updateBoard(state);
    }

    render() {
        const rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: 220,
            height: 216,

        };

        const messageContainerStyle = {
            margin: 'auto',
            display: 'flex',
            width: 220,
            height: 216,

        };
        const messageStyle = {
            textAlign: 'center',
            margin: 'auto',
            border: '3px solid red',
            borderRadius: '4px',
            padding: '4px'
        };

        const board = this.state.boardStyle.map((row, j) => {
            return row.map((square, i) =>
                <Square key={i.toString()}
                    style={square.style}
                    color={square.color}
                    handleClick={this.handleClick}
                    handleMouseUp={this.handleMouseUp} />
            );
        });
        const startStyle = {
            margin: '5px',
            width: '65px'
        };
        if (this.state.showStart === false) startStyle.visibility = 'hidden';
        const button = <StartButton startText={this.state.startText} start={this.start} style={startStyle} />;
        const quitButton = <QuitButton reset={this.reset} />;
        const sequenceLength = this.state.sequenceLength;
        return (
            <div>
                <div className={'container'} style={this.center}>

                    {/* <div style={messageContainerStyle}>
                        <Message message={this.state.message}
                            style={messageStyle} />
                    </div> */}

                    <div style={rowStyle}>
                        {board}
                    </div>

                </div>
                <Info style={this.center}
                    sequenceLength={sequenceLength} />
                <div style={this.center}>
                    {button} {quitButton}
                </div>


            </div>
        );
    }
}

class QuitButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.reset = this.reset.bind(this);
    }
    reset(message, won) {
        this.props.reset(message, won);
    }
    render() {
        const style = {
            margin: '5px',
        };
        return (
            <div>
                <Button bsStyle="warning"
                    style={style}
                    onClick={() => { this.reset('Game over', false) }}
                >Quit
                </Button>
            </div>
        );
    }
}
class Message extends Component {
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
        const style = {
            margin: '5px',
            width: '65px'
        };

        return (
            <Button id={'start-button'}
                bsStyle="primary"
                style={this.props.style}
                onClick={() => { this.start() }}
            >{this.props.startText}</Button>
        );
    }
}

class Info extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.style = Object.assign({}, this.props.style);
        this.style.margin = '5px';
        this.childStyle = {
            border: '3px solid',
            width: '200px',
            padding: '5px',
        }

        this.style.justifyContent = 'center';
    }
    render() {
        return (
            <div style={this.style}>

                <div style={this.childStyle}>
                    Sequence length: {this.props.sequenceLength}
                </div>
            </div>
        );
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