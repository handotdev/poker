import React, { Component } from 'react'

export class PlayerCard extends Component {
    render() {

        const { id, name, bank, wins } = this.props.playerInfo;
        const turn = this.props.turn;

        const playerCardStyle = {
            display: 'inline-block',
            margin: '0 4px',
            width: '124px',
            height: '180px',
            backgroundColor: '#EEE',
            borderRadius: '8px',
            verticalAlign: 'top',
            border: (turn) ? '4px solid black' : 'none'
        }

        return (
            <div style={playerCardStyle} key={id}>
                <h3>{name}</h3>
                <p>{bank}</p>
                <p>{wins} wins</p>
            </div>
        )
    }
}

export default PlayerCard
