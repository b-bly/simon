import React, { Component } from 'react';

export class Info extends Component {
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
            <div className={this.props.className}>
                <div className={'info'}>
                    Sequence length: {this.props.sequenceLength}
                </div>
            </div>
        );
    }
}