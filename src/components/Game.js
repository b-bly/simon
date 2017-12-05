import React, { Component } from 'react';

// This was helpful: 
// https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753
export class Game extends Component {
    constructor(props) {
        super(props);
        this.style = {
            backgroundColor: 'gray'
        }
    }
    
        componentDidMount() {
            this.updateCanvas();
        }
        componentDidUpdate() {
            this.updateCanvas();
        }
        updateCanvas() {
            const ctx = this.refs.canvas.getContext('2d');
            ctx.clearRect(0,0, 300, 300);
            // draw children “components”
            //rect({ctx, x: 10, y: 10, width: 50, height: 50});
        }
        render() {
             return (
                 <canvas ref="canvas" width={300} height={300} style={this.style}/>
             );
        }
    }

    function rect(props) {
        const {ctx, x, y, width, height} = props;
        ctx.fillRect(x, y, width, height);
    }