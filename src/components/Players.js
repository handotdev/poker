import React, { Component } from 'react';
import PlayerCard from './PlayerCard';

export class Players extends Component {
    render() {

        return (
            <div style={{textAlign: 'center', marginTop: '28px', marginBottom: '220px'}}>
                {/* Player card */}
                {this.props.players.map((player) => <PlayerCard key={player.id} playerInfo={player} turn={player.id === this.props.activePlayer}/>)}
            </div>
        )
    }
}

export default Players
