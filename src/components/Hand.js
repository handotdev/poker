import React, { Component } from 'react';
import Card from './Card';

export class Hand extends Component {
    render() {

        return (
            <div style={handStyle}>
                <div style={inline}>
                    Hand:
                    {this.props.hand.map((card, i) => <Card key={i} cardID={card} height="150"/>)}
                </div>
            </div>
        )
    }
}

const handStyle = {
    position: 'fixed', 
    bottom: '0', 
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    backgroundColor: '#C3986B',
    textAlign: 'center',
    borderTop: '8px solid black',
    padding: '12px'
}

const inline = {
    display: 'inline-block'
}

export default Hand
