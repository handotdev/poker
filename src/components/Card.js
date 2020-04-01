import React, { Component } from 'react';

export class Card extends Component {
    
    render() {

        // Import from dynamic path of card file
        const cards = require.context('../cards', true)
        const card = cards(`./${this.props.cardID}.svg`);

        const cardStyle = {
            height: (this.props.height) ? `${this.props.height}px` : '180px'
        }

        return (
            <div style={cardContainerStyle}>
                <img src={card} alt={this.props.cardID} style={cardStyle}/>
            </div>
        )
    }
}

const cardContainerStyle = {
    display: 'inline-block', 
    margin: '0 4px'
}

export default Card
