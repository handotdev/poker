import React, { Component } from 'react';
import Table from './components/Table';
import Players from './components/Players';
import Hand from './components/Hand';

class App extends Component {

  ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  suits = ['c', 'd', 'h', 's'];
  deck = [];

  state = {
    table: [],
    // table: ['Ah', '10s', '5c'],
    playerID: '52h2d',
    hand: ['8h', '9h'],
    players: [
      {
        id: '42h2d',
        name: 'Rebeba',
        role: 'Dealer',
        bank: 180,
        wager: 50,
        fold: false
      },
      {
        id: '82h2d',
        name: 'Geo',
        role: 'Big Blind',
        bank: 520,
        wager: 50,
        fold: true
      },
      {
        id: '52h2d',
        name: 'Han',
        bank: 200,
        fold: false
      }
    ],
    activePlayerID: '52h2d'
  }

  newDeck = () => {
    this.deck = [];

    // Readd cards to deck
    this.ranks.forEach((rank) => {
      this.suits.forEach((suit) => {
        this.deck.push(`${rank}${suit}`);
      })
    })
  }

  handleNewGame = () => {
    // Creates a new deck
    this.newDeck();

    // Clear table and hand
    this.setState({table: []})
    this.setState({hand: []})

    // Deal cards
    this.deal();
  }

  deal = () => {
    this.setState({hand: this.draw(2)});
  }

  // Returns array of card(s) drawn from deck
  draw = (cards = 1) => {

    let pulledCards = [];

    for (let i = 0; i < cards; i++) {
      const deckLength = this.deck.length;
      const randomCardIndex = Math.floor(Math.random() * deckLength);

      pulledCards.push(this.deck.splice(randomCardIndex, 1));
    }

    return pulledCards;
  }

  // Flips poker cards. Flips 3 if no cards on table. Flip 1 elsewise and under or equals 5 cards
  handleFlip = () => {
    if (this.deck.length === 0) {
      console.error("Empty deck. Had to readd all cards");
      this.newDeck();
    }
    

    const tableLength = this.state.table.length;
    if (tableLength === 0) {
      this.setState({table: this.draw(3)})
    } else if (tableLength < 5) {
      const newCards = this.draw();
      const tableWithNewCards = this.state.table.concat(newCards);
      this.setState({table: tableWithNewCards});
    }
  }

  render() {

    const {playerID, table, hand, players, activePlayerID} = this.state;

    return (
      <div>
        <div style={overallStyle}>
          <Table
            cards={table}
          />
          <Players 
            players={players}
            activePlayerID={activePlayerID}
          />
        </div>
        <Hand
          hand={hand} 
          playerID={playerID}
          activePlayerID={activePlayerID}
          onNewGame={this.handleNewGame}
          onFlip={this.handleFlip}
        />
      </div>
    );
  }
}

const overallStyle = {
  padding: '28px'
}

export default App;