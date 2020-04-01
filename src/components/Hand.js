import React, { Component } from 'react';
import Card from './Card';

export class Hand extends Component {
    render() {

        return (
            <div style={handStyle}>
                <div style={inline}>
                    {this.props.hand.map((card, i) => <Card key={i} cardID={card} height="150"/>)}
                </div>
                <div style={inline}>
                    <button className="btn btn-outline-success btn-lg">Raise</button>
                    <button className="btn btn-outline-secondary btn-lg">Check</button>
                    <button className="btn btn-outline-danger btn-lg">Fold</button>
                    <button className="btn btn-outline-danger btn-lg" disabled>Disabled</button>
                </div>
            </div>
        )
    }
}

const handStyle = {
    position: 'fixed', 
    bottom: '0', 
    width: '100%',
    backgroundColor: '#F7F7F7',
    borderTop: '1px solid rgba(0,0,0,.125)',
    textAlign: 'center',
    padding: '12px'
}

const inline = {
    display: 'inline-block'
}

export default Hand
