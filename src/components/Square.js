import React, { Component } from 'react';


export class Square extends Component {
    constructor(props) {
        super(props);
        this.style = props.style;

        // {
        //     width: 50,
        //     height: 50,
        //     backgroundColor: 'blue',
        //     position: 'fixed'
        // };

    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    render() {
        return (
            <div style={this.style}>
                            </div>
                            );
    }
}

function rect(props) {
    const {ctx, x, y, width, height } = props;
    ctx.fillRect(x, y, width, height);
}