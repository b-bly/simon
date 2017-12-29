//TO DO
//encase whole game in lightgray div
//move constants
//adjustable variables--speed, colors?
//have 3 strikes before game over and list in info panel
//save game and high scores to database

import React, { Component } from 'react';
import { Square } from './Square';
// import { Info } from './Info';
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
const SQUARE_WIDTH_INT = 200;
const SQUARE_WIDTH = SQUARE_WIDTH_INT + 'px';
const ROW_WIDTH = SQUARE_WIDTH_INT * 2.2 + 'px';
const ROW_HEIGHT = SQUARE_WIDTH_INT * 2 + 16 + 'px';

export class Game extends Component {
    constructor(props) {
        super(props);
        //bind this is needed for functions being called from child components
        this.start = this.start.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
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
            startText: 'Start',
            gameStarted: false
        }
    }



    handleMouseDown(color) {
        if (this.state.gameStarted) {
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



    changeColor(color, lit) {
        const stateCopy = this.createBoard();
        const boardStyle = stateCopy.boardStyle.map((row, i) => {
            const updatedRow = row.map((square, j) => {
                let squareCopy = Object.assign({}, square);
                if (square.color === color) {
                    //got error when assigning directly to square.style.backgroundColor
                    // Cannot assign to read only property 'backgroundColor' of object
                    if (lit === true) { //change to lit color
                        squareCopy.className = 'square light-' + colorMap[i * 2 + j]; //change 2d array index to 1D array index                    
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
            message: '',
            gameStarted: true
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
        if (this.state.gameStarted) {
            this.changeColor(color, false);
            //checkSelection
            this.checkSelection(color);
        }
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
            const score = this.state.sequenceLength;
            const sequenceLength = this.state.sequenceLength + 1;
            swal({
                position: '',
                type: 'success',
                title: 'Nice!',
                text: 'Score: ' + score,
                showConfirmButton: false,
                timer: 1000
            }).then((result) => {
                setTimeout(() => {
                    this.start();
                }, 400);
            });
            this.setState({
                sequenceIndex: 0,
                showStart: true,
                message: message,
                sequenceLength: sequenceLength,
                startText: 'play',
                gameStarted: false,
            });
        } else {
            console.log('reset, won = false');
            const score = this.state.sequenceLength - 1;
            this.setState({
                sequenceIndex: 0,
                showStart: true,
                message: message,
                sequenceLength: 1,
                sequence: [],
                gameStarted: false,
            });
            swal({
                title: 'Game over',
                text: 'Score: ' + score,
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
            });
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
        const squareStyle = { width: SQUARE_WIDTH, height: SQUARE_WIDTH };
        const rowStyle = {
            width: ROW_WIDTH,
            height: ROW_HEIGHT
        };
        const board = this.state.boardStyle.map((row, j) => {
            return row.map((square, i) =>
                <Square key={i.toString()}
                    className={square.className}
                    color={square.color}
                    style={squareStyle}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseUp={this.handleMouseUp} />
            );
        });

        console.log('board');
        console.log(board);

        let button = null;
        if (this.state.gameStarted === false) {
        button = <StartButton className={this.startClass()} startText={this.state.startText} start={this.start} />;
        } else { 
            button = <QuitButton 
            reset={this.reset} />;
        }
        const sequenceLength = this.state.sequenceLength;
        return (
            <div>
                <div className={'container'} >
                    <div className={'row'}
                        style={rowStyle}>
                        {board}
                    </div>
                </div>
                
                <div className={'container'}>
                    {button}
                </div>


            </div>
        );
    }
}

