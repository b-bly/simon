//TO DO
//encase whole game in lightgray div
//move constants
//adjustable variables--speed, colors?
//have 3 strikes before game over and list in info panel
//save game and high scores to database

import React, { Component } from 'react';
import { Square } from './Square';
import { QuitButton } from './QuitButton';
import { StartButton } from './StartButton';

import { CONSTANTS } from './Constants';

//styles
import '../styles/Game.css';

// This was helpful: 
// https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753
export class Board extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleMouseDown(color) {
        if (this.props.gameStarted === true) {
            this.props.changeColor(color, true); //true means square will change to lit
        }
    }

    createBoard() { //board obj = {style, color, lit(boolean)}
        let row = [];
        const boardStyle = [];
        CONSTANTS.boardArr.forEach((num, i) => {
            let property = {};
            property.color = CONSTANTS.colorMap[i];
            property.className = 'square ' + CONSTANTS.colorMap[i];
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

    start() {
        console.log('start called');
        // call const board = this.createBoard and pass to generateSequence and then play Sequence
        this.props.start(); //calls playSequence() as callback
    }

    handleMouseUp(color) {
        if (this.props.gameStarted) {
            this.props.changeColor(color, false);
            //checkSelection
            this.props.checkSelection(color);
        }
    }

    componentWillMount() {
        const boardCopy = this.createBoard();
        this.props.saveBoardCopy(boardCopy);
    }

    startClass() {
        if (this.props.gameStarted === false) {
            return 'start';
        } else {
            return 'start hide-start';
        }
    }

    render() {

        const rowStyle = {
            width: CONSTANTS.ROW_WIDTH,
            height: CONSTANTS.ROW_HEIGHT
        };
        const board = this.props.boardStyle.map((row, j) => {
            return row.map((square, i) =>
                <Square key={i.toString()}
                    className={square.className}
                    color={square.color}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseUp={this.handleMouseUp} />
            );
        });

        let button = null;
        if (this.props.gameStarted === false) {
            button = <StartButton className={this.startClass()} startText={'Start'} start={this.start} />;
        } else {
            button = <QuitButton
                reset={this.props.reset} />;
        }

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

