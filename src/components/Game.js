//TO DO
//encase whole game in lightgray div
//move constants
//adjustable variables--speed, colors?
//have 3 strikes before game over and list in info panel
//save game and high scores to database

import React, { Component } from 'react';
import { Square } from './Square';
import { Info } from './Info';
import { Message } from './Message';
import { QuitButton } from './QuitButton';
import { StartButton } from './StartButton';



//styles
import '../styles/Game.css';
//sweetalerts2
import swal from 'sweetalert2';

// This was helpful: 
// https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753
const boardArr = [0, 1, 2, 3];
const colorMap = ['red', 'blue', 'yellow', 'green'];
const INTERVAL = 500;
const INTERVAL_SPACING = 200;

export class Game extends Component {
    constructor(props) {
        super(props);
        //bind this is needed for functions being called from child components
        this.handleClick = this.handleClick.bind(this);
        this.start = this.start.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.generateSequence = this.generateSequence.bind(this);
        this.reset = this.reset.bind(this);
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
            property.color = colorMap[i];
            property.className = 'square ' + colorMap[i];
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
                    squareCopy.className = 'square light-' + colorMap[i * 2 + j]; //change 2d array index to 1D array index                   
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
                        squareCopy.className = 'square light-'  + colorMap[i * 2 + j]; //change 2d array index to 1D array index                    
                    } else {
                        squareCopy.className = 'square ' + colorMap[i * 2 + j]; //change 2d array index to 1D array index                    
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

    }
    generateSequence() {
        console.log('generateSequence called');

        const sequence = this.state.sequence.slice();
        const random = Math.floor(Math.random() * 4); //random color
        const color = colorMap[random];
        sequence.push(color);

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
            //x = on, y = off
            //x = i*1.1	y = 1 + x
            setTimeout(() => {
                this.changeColor(color, true);
            }, (INTERVAL + INTERVAL_SPACING) * i);
            setTimeout(() => {
                this.changeColor(color, false);
            }, (INTERVAL + INTERVAL_SPACING) * i + INTERVAL);
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
                sequenceLength: 1,
                sequence: []
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
    startClass() {
        if (this.state.showStart === true) {
            return 'start';
        } else {
            return 'start hide-start';
        }
    }

    render() {

        const board = this.state.boardStyle.map((row, j) => {
            return row.map((square, i) =>
                <Square key={i.toString()}
                    className={square.className}
                    color={square.color}
                    handleClick={this.handleClick}
                    handleMouseUp={this.handleMouseUp} />
            );
        });

        console.log('state');
        console.log(this.state);

        const button = <StartButton className={this.startClass()} startText={this.state.startText} start={this.start} />;
        const quitButton = <QuitButton reset={this.reset} />;
        const sequenceLength = this.state.sequenceLength;
        return (
            <div>
                <div className={'container'} >
                    <div className={'row'}>
                        {board}
                    </div>
                </div>
                <Info className={'container'}
                    sequenceLength={sequenceLength} />
                <div className={'container'}>
                    {button} {quitButton}
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