import React from "react";
import { cards } from "./helpers/cards";
import { CardProp } from "./helpers/interfaces";
import Card from "./components/cards";
import { PlayerSeat, DealerSeat } from "./helpers/seat";
import { BlackJacker } from "./helpers/interfaces";
// import Grid from '@mui/material/Grid'; // Build faster
import { Grid } from "@mui/material"; // Easier to read code

import "./App.css";
import PlayerHand from "./components/player";

function App() {
  const playerNames = React.useMemo(
    () =>
      Array(7)
        .fill("Player")
        .map((name, index) => `${name} ${index + 1}`),
    []
  );

  const [players, _setPlayers] = React.useState<BlackJacker[]>(
    playerNames.map((name, index) => ({
      name: name,
      seat: PlayerSeat[index],
      isPlayer: true,
    }))
  );

  const [cardDeck, setCardDeck] = React.useState<CardProp[]>(cards);

  return (
    <div className="App">
      <Grid container spacing={2} direction="row" sx={{ minHeight: "100vh" }}>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <Grid item xs={4} key={i} border={1}>
              <PlayerHand
                playerInfo={players.find((player) => player.seat === i)}
                hand={[]}
              />
              {i === DealerSeat && "Dealer"}
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default App;
