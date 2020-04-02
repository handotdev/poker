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
                {(!this.props.isLoggedIn) ?
                <div style={seatCardStyle} onClick={this.props.onNewUser}>Take a seat</div> : ''}
            </div>
        )
    }
}

const seatCardStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
    margin: '4px',
    width: '160px',
    minHeight: '110px',
    lineHeight: '110px',
    backgroundColor: '#F8F9FA',
    borderRadius: '5px',
    border: '2px dashed rgba(0,0,0,.125)',
    cursor: 'pointer',
    color: 'grey'
}

export default Players
