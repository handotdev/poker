import React, { Component } from 'react';
import Table from './components/Table';
import Players from './components/Players';
import Hand from './components/Hand';

import firebase from './firebase';

class App extends Component {

  constructor(props) {
    super(props);

    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    this.suits = ['c', 'd', 'h', 's'];
    this.deck = [];

    this.state = {
      table: [],
      // Add Google Auth ID
      playerID: '52h2d',
      hand: ['8h', '9h'],
      players: {},
      activePlayerID: ''
    }

    const gameID = '03d19c9b-f4e9-42cd-9f1c-3c275a2ad977';
    this.gameRef = firebase.database().ref("games/"+gameID);
    this.playerRef = this.gameRef.child('players').child(this.state.playerID);
  }

  componentDidMount() {
    this.gameRef.on('value', (snapshot) => {
      
      // Load data from realtime
      const { table, activePlayerID, players } = snapshot.val();
      this.setState({
        table: (table) ? table : [],
        activePlayerID: (activePlayerID) ? activePlayerID : "",
        players: (players) ? players : {},
        // Update hand from your hand data
        hand: (players[this.state.playerID].hand) ? players[this.state.playerID].hand : []
      })
    })
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
          table={table}
          hand={hand} 
          playerID={playerID}
          activePlayerID={activePlayerID}
          onNewGame={this.handleNewGame}
          onFlip={this.handleFlip}
        />
      </div>
    );
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

    // Clears table cards
    this.gameRef.update({table: []});

    // Deal cards
    this.deal();
  }

  deal = () => this.playerRef.update({hand: this.draw(2)});

  // Returns array of card(s) drawn from deck
  draw = (cards = 1) => {

    let pulledCards = [];

    for (let i = 0; i < cards; i++) {
      const deckLength = this.deck.length;
      const randomCardIndex = Math.floor(Math.random() * deckLength);

      pulledCards.push(this.deck.splice(randomCardIndex, 1)[0]);
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
      this.gameRef.update({table: this.draw(3)})
    } else if (tableLength < 5) {
      const newCards = this.draw();
      const tableWithNewCards = this.state.table.concat(newCards);
      this.gameRef.update({table: tableWithNewCards})
    }
  }
}

const overallStyle = {
  padding: '28px'
}

export default App;