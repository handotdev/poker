import React, { Component } from 'react';
import Table from './components/Table';
import Players from './components/Players';
import Hand from './components/Hand';

class App extends Component {

  state = {
    table: ['Ah', '10s', '5c', 'Qs', 'Jh'],
    hand: ['8h', '9h'],
    players: [
      {
        id: '42h2d',
        name: 'Rebeba',
        role: 'Dealer',
        bank: 180,
        wager: 50
      },
      {
        id: '82h2d',
        name: 'Geo',
        role: 'Big Blind',
        bank: 520,
        wager: 50
      },
      {
        id: '52h2d',
        name: 'Han',
        bank: 200
      }
    ],
    activePlayer: '52h2d'
  }

  render() {

    const {table, hand, players, activePlayer} = this.state;

    return (
      <div>
        <div style={overallStyle}>
          <Table
            cards={table}
          />
          <Players 
            players={players}
            activePlayer={activePlayer}
          />
        </div>
        <Hand
          hand={hand} 
        />
      </div>
    );
  }
}

const overallStyle = {
  padding: '28px'
}

export default App;
