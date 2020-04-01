import React, { Component } from 'react';

export class Card extends Component {
    
    render() {

        // Import from dynamic path of card file
        const cards = require.context('../cards', true)
        const card = cards(`./${this.props.cardID}.svg`);

        return (
            <div>
                <img src={card} alt={this.props.cardID} style={cardStyle}/>
            </div>
        )
    }
}

const cardStyle = {
    height: '180px'
}

export default Card
