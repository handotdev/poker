import React, { Component } from 'react'

export class PlayerCard extends Component {
    render() {

        const { name, bank, role, wager } = this.props.playerInfo;
        const turn = this.props.turn;

        const playerCardStyle = {
            margin: '0 4px',
            width: '160px',
            border: (turn) ? '4px solid black' : 'none'
        }

        return (
            <div className="card d-inline-block bg-light" style={playerCardStyle}>
                <div className="card-header">
                    {`${name} `}
                    {(role) ? <span class="badge badge-secondary">{role}</span> : ''}
                </div>
                <div className="card-body">
                    <p className="card-text h5">
                    {`${bank} `}
                        {(wager) ? <span class="badge badge-danger">{wager}</span> : ''}
                    </p>
                </div>
            </div>
        )
    }
}

export default PlayerCard
