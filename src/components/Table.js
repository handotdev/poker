import React, { Component } from 'react';
import Card from './Card';

export class Table extends Component {

    render() {
        return (
            <div style={tableStyle}>
                <div style={{textAlign: 'center'}}>
                    { this.props.cards.map((cardID, i) => <Card key={i} cardID={cardID} />) }
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
