import React, { Component } from 'react';
import Card from './Card';

export class Table extends Component {
    render() {
        return (
            <div>
                <Card cardID="2h" />
                <Card cardID="2s" />
            </div>
        )
    }
}

export default Table
