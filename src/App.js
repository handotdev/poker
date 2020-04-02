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
      playerID: '',
      hand: [],
      players: {},
      activePlayerID: ''
    }

    const gameID = '03d19c9b-f4e9-42cd-9f1c-3c275a2ad977';
    this.gameRef = firebase.database().ref("games/"+gameID);
  }

  componentDidMount() {
    // Check if user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({playerID: user.uid});
      } else {
        this.setState({playerID: ''});
      }
    });

    this.gameRef.on('value', (snapshot) => {      
      // Load data from realtime
      const { table, activePlayerID, players } = snapshot.val();
      this.setState({
        table: (table) ? table : [],
        activePlayerID: (activePlayerID) ? activePlayerID : "",
        players: (players) ? players : {},
        // Update hand from your hand data
        hand: (this.state.playerID.length > 0 && players[this.state.playerID].hand) ? players[this.state.playerID].hand : []
      })
    })
  }

  render() {
    const {playerID, table, hand, players, activePlayerID} = this.state;
    const isLoggedIn = playerID.length > 0;
    return (
      <div>
        <div style={overallStyle}>
          <Table
            cards={table}
          />
          <Players 
            players={players}
            activePlayerID={activePlayerID}
            isLoggedIn={isLoggedIn}
            onNewUser={this.handleNewUser}
          />
        </div>
        { (isLoggedIn) ? <Hand
          table={table}
          hand={hand} 
          playerID={playerID}
          activePlayerID={activePlayerID}
          onCheck={this.handleCheck}
          onFold={this.handleFold}
          onNewGame={this.handleNewGame}
          onFlip={this.handleFlip}
          onLogout={this.handleLogout}
        /> : '' }
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

    // Restores player information to default
    this.restorePlayers();

    // Rotate roles of all players
    // Locate the index of the first player after big blind
    this.rotateRoles();

    // Deal cards
    this.dealAll();
  }

  restorePlayers = () => {
    // Retrieve all player IDs
    const playerIDs = Object.keys(this.state.players);
    const updates = {};

    playerIDs.forEach((playerID) => {
      updates[`${playerID}/wager`] = '';
      updates[`${playerID}/fold`] = false;
    })
    
    this.gameRef.child('players').update(updates);
  }

  rotateRoles = () => {
    // Rotate roles
    const playersEntries = Object.entries(this.state.players);
    const playerIDs = [];
    const playerRoles = [];

    playersEntries.forEach(([playerID, playerInfo]) => {
      playerIDs.push(playerID);
      playerRoles.push(playerInfo.role ? playerInfo.role : '');
    })

    // Circle role to the right by one
    playerRoles.unshift(playerRoles.pop());

    const updates = {};
    // Index of big blind
    let indexOfBigBlind = 0;
    playerIDs.forEach((playerID, index) => {
      const role = playerRoles[index];
      updates[`${playerID}/role`] = role;

      // Use same loop to find index of big blind
      if (role === 'Big Blind') indexOfBigBlind = index;
    })
    
    let indexOfFirstPlayer = indexOfBigBlind + 1;
    if (playersEntries.length === indexOfFirstPlayer) indexOfFirstPlayer = 0;
    const activePlayerID = playerIDs[indexOfFirstPlayer];

    // Update roles
    this.gameRef.child('players').update(updates);
    // Update activePlayerID after new big blind location
    this.gameRef.update({activePlayerID});
  }

  dealPlayer = () => {
    const playerRef = this.gameRef.child('players').child(this.state.playerID);
    playerRef.update({hand: this.draw(2)});
  }

  dealAll = () => {
    // Retrieve all player IDs
    const playerIDs = Object.keys(this.state.players);
    const updates = {};

    playerIDs.forEach((playerID) => {
      updates[`${playerID}/hand`] = this.draw(2);
    })
    
    this.gameRef.child('players').update(updates);
  }

  // Returns array of card(s) drawn from deck
  draw = (cards = 1) => {
    // Intialize empty deck to add randomly generated cards
    let pulledCards = [];

    // TODO: make sure that the cards generated are not already drawn
    for (let i = 0; i < cards; i++) {
      const deckLength = this.deck.length;
      const randomCardIndex = Math.floor(Math.random() * deckLength);

      pulledCards.push(this.deck.splice(randomCardIndex, 1)[0]);
    }
    return pulledCards;
  }

  moveToNextActivePlayer = () => {
    // TODO: standardize function rather than using this system repeated time to move active player by 1
    const { players, activePlayerID } = this.state;
    const playerIDs = Object.keys(players);
    const playerValues = Object.values(players);
    let indexOfActivePlayer = playerIDs.indexOf(activePlayerID);


    let indexOfNextActivePlayer = indexOfActivePlayer + 1;
    if (playerIDs.length === indexOfNextActivePlayer) indexOfNextActivePlayer = 0;

    // Loop pass players that have folded
    while (playerValues[indexOfNextActivePlayer].fold === true) {
      indexOfNextActivePlayer++;
      if (playerIDs.length === indexOfNextActivePlayer) indexOfNextActivePlayer = 0;
    }

    const nextActivePlayerID = playerIDs[indexOfNextActivePlayer];

    this.gameRef.update({activePlayerID: nextActivePlayerID});
  }

  handleCheck = () => {
    this.moveToNextActivePlayer();
  }

  handleFold = () => {
    // TODO: standardize updating the player
    const updates = {};
    updates[`${this.state.playerID}/fold`] = true;
    this.gameRef.child('players').update(updates);
    
    this.moveToNextActivePlayer();
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

  handleNewUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      const { uid, displayName } = result.user;
      
      let updates = {};
      updates['/players/'+uid] = {
        bank: 200,
        fold: false,
        name: displayName
      }
      this.gameRef.update(updates);
    }).catch((err) => {
      console.error(err);
    })
  }

  handleLogout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.error(error)
    });
  }
}

const overallStyle = {
  padding: '28px'
}

export default App;