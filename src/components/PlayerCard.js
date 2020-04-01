import React, { Component } from 'react';
import pokerChip from '../img/chip.png';

export class PlayerCard extends Component {
    render() {

        const { name, bank, role, wager } = this.props.playerInfo;
        const turn = this.props.turn;

        const playerCardStyle = {
            margin: '0 4px',
            width: '160px',
            border: (turn) ? '3px solid #888' : 'none'
        }

        return (
            <div className="card d-inline-block bg-light" style={playerCardStyle}>
                <div className="card-header">
                    {name} {(role) ? <span className="badge badge-secondary">{role}</span> : ''}
                </div>
                <div className="card-body">
                    <p className="card-text h5">
                    <img src={pokerChip} width="15px" alt="Chips: "/> {bank} {(wager) ? <span className="badge badge-danger">{wager}</span> : ''}
                    </p>
                </div>
            </div>
        )
    }
}

export default PlayerCard
