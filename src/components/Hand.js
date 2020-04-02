import React, { Component } from 'react';
import Card from './Card';
import { Hand as Poker } from 'pokersolver';

export class Hand extends Component {

    render() {
        const { playerID, activePlayerID } = this.props;
        const disableButton = !(playerID === activePlayerID);
        
        const { table, hand } = this.props;
        const allCards = table.concat(hand);
        const handName = (hand.length > 0) ? Poker.solve(allCards).descr : 'Waiting for next round...';

        return (
            <div style={handStyle}>
                <div className="row d-flex">
                    <div className="col-5">
                        <div>
                            {hand.map((card, i) => <Card key={i} cardID={card} height="150"/>)}
                        </div>
                        <h4 className="mb-0"><span className="badge badge-success">{handName}</span></h4>
                    </div>
                    <div className="col-7 m-auto">
                        <button className="btn btn-outline-success btn-lg m-1" style={buttonStyle} disabled={disableButton}>Raise</button>
                        <button className="btn btn-outline-secondary btn-lg m-1" style={buttonStyle} disabled={disableButton} onClick={this.props.onCheck}>Check</button>
                        <button className="btn btn-outline-danger btn-lg m-1" style={buttonStyle} disabled={disableButton} onClick={this.props.onFold}>Fold</button>
                        <button className="btn btn-primary btn-lg m-1" style={buttonStyle} onClick={this.props.onNewGame}>Restart</button>
                        <button className="btn btn-primary btn-lg m-1" style={buttonStyle} onClick={this.props.onFlip}>Flip</button>
                        <button className="btn btn-danger btn-lg m-1" style={buttonStyle} onClick={this.props.onLogout}>Logout</button>
                    </div>
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

const buttonStyle = {
    width: '100px'
}

export default Hand