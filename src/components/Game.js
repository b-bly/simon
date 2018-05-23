//TO DO
//encase whole game in lightgray div
//x move constants
//adjustable variables--speed, colors?
//have 3 strikes before game over and list in info panel
//save game and high scores to database

import React, { Component } from 'react';
import { Board } from './Board';

//styles
import '../styles/Game.css';
//sweetalerts2
import swal from 'sweetalert2';
// CONSTANTS
import { CONSTANTS } from './Constants';

// This was helpful: 
// https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753

export class Game extends Component {
    constructor(props) {
        super(props);
        //bind this is needed for functions being called from child components
        this.start = this.start.bind(this);
        this.generateSequence = this.generateSequence.bind(this);
        this.reset = this.reset.bind(this);
        this.saveBoardCopy = this.saveBoardCopy.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.checkSelection = this.checkSelection.bind(this);

        this.state = {
            lit: { red: false, blue: false, yellow: false, green: false },
            boardStyle: [],
            sequence: [],
            sequenceLength: 1,
            sequenceIndex: 0,
            message: 'Click start',
            gameStarted: false,
        }
    }

    saveBoardCopy(boardCopy) {
        this.setState(boardCopy); //boardStyle
    }

    handleMouseDown(state) {
        this.setState(state);
    }

    changeColor(color, lit) {
        const stateCopy = Object.assign({}, this.state);
        const boardStyle = stateCopy.boardStyle.map((row, i) => {
            const updatedRow = row.map((square, j) => {
                let squareCopy = Object.assign({}, square);
                if (square.color === color) {
                    //got error when assigning directly to square.style.backgroundColor
                    // Cannot assign to read only property 'backgroundColor' of object
                    if (lit === true) { //change to lit color
                        squareCopy.className = 'square light-' + CONSTANTS.colorMap[i * 2 + j]; //change 2d array index to 1D array index                    
                    } else {
                        squareCopy.className = 'square ' + CONSTANTS.colorMap[i * 2 + j]; //change 2d array index to 1D array index                    
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
    }

    start() {
        console.log('start called');
        // call const board = this.createBoard and pass to generateSequence and then play Sequence
        this.generateSequence(); //calls playSequence() as callback
    }
    generateSequence() {
        const sequence = this.state.sequence.slice();
        const random = Math.floor(Math.random() * 4); //random color
        const color = CONSTANTS.colorMap[random];
        sequence.push(color);

        //wait until player completes correct sequence to update sequenceLength
        //or when it is displayed to the user it is one longer than the current sequence
        //sequenceLength++;
        this.setState({
            sequence: sequence,
            message: '',
            gameStarted: true
        }, this.playSequence(sequence));
    }

    playSequence(sequence) {
        console.log('playSequence called');
        console.log('sequence: ');
        console.log(sequence);

        sequence.forEach((color, i) => {
            //x = on, y = off
            //x = i*1.1	y = 1 + x
            setTimeout(() => {              
                this.changeColor(color, true);
            }, (CONSTANTS.INTERVAL + CONSTANTS.INTERVAL_SPACING) * i);
            setTimeout(() => {
                this.changeColor(color, false);
            }, (CONSTANTS.INTERVAL + CONSTANTS.INTERVAL_SPACING) * i + CONSTANTS.INTERVAL);
        });
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
                message: message,
                sequenceLength: sequenceLength,
                gameStarted: false,
            });
        } else {
            const score = this.state.sequenceLength - 1;
            this.setState({
                sequenceIndex: 0,
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

    startClass() {
        if (this.state.showStart === true) {
            return 'start';
        } else {
            return 'start hide-start';
        }
    }

    render() {
        return (
            <div>
                <Board 
                { ...this.state }
                saveBoardCopy={this.saveBoardCopy}
                start={this.start}
                handleMouseDown={this.handleMouseDown}
                reset={this.reset}
                checkSelection={this.checkSelection}
                changeColor={this.changeColor}
                />
            </div>
        );
    }
}

