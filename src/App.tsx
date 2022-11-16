import React from "react";
import { cards } from "./helpers/cards";
import Card from "./components/cards";
import { PlayerSeat, DealerSeat, BlackJacker } from "./helpers/seat";
// import Grid from '@mui/material/Grid'; // Build faster
import { Grid } from "@mui/material"; // Easier to read code

import "./App.css";

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

  return (
    <div className="App">
      <Grid container spacing={2} direction="row" sx={{ minHeight: "100vh" }}>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <Grid item xs={4} key={i} border={1}>
              {players.find((player) => player.seat === i)?.name}
              {i === DealerSeat && "Dealer"}
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default App;
