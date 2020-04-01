import React, { Component } from 'react';
import Card from './Card';

export class Table extends Component {

    render() {

        // Clone array
        let cards = [...this.props.cards];
        while (cards.length < 5) cards.push('NA');

        return (
            <div style={tableStyle}>
                <div className="row">
                    <div className="col-2 p-0 h1 text-right text-white d-flex">
                        <div className="m-auto">
                            Pot: <span className="badge badge-danger">100</span>
                        </div>
                    </div>
                    <div className="col-10 p-0 text-center">
                        { cards.map((cardID, i) => <Card key={i} cardID={cardID} />) }
                    </div>
                </div>
            </div>
        )
    }
}

const tableStyle = {
    padding: '32px',
    border: '16px solid #C3986B',
    boxShadow: '0px 0px 0px 8px #000',
    borderRadius: '125px',
    backgroundColor: '#446A23'
}

export default Table
