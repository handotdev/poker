import React, { Component } from 'react';
import PlayerCard from './PlayerCard';

export class Players extends Component {
    render() {
        const playersInfoEntries = Object.entries(this.props.players);
        return (
            <div style={{textAlign: 'center', marginTop: '28px', marginBottom: '180px'}}>
                {/* Player card */}
                {playersInfoEntries.map(([id, player]) => 
                <PlayerCard key={id} playerInfo={player} turn={id === this.props.activePlayerID}/>)}
                <button className="btn" onClick={this.props.onNewUser}>Login</button>
            </div>
        )
    }
}

export default Players
