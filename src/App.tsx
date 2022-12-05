import React from "react";
import { cards, shuffleCards } from "./helpers/cards";
import { CardProp } from "./helpers/interfaces";
import Card from "./components/cards";
import { PlayerSeat, DealerSeat, DeckSeat } from "./helpers/seat";
import { BlackJacker } from "./helpers/interfaces";
// import Grid from '@mui/material/Grid'; // Build faster
import { Grid, Button } from "@mui/material"; // Easier to read code

import "./App.css";
import PlayerHand from "./components/player";

const dealer: BlackJacker = {
  name: "Dealer",
  seat: DealerSeat,
  cards: [],
  isPlayer: false,
  isPlayerActive: false,
};

function App() {
  const playerNames = React.useMemo(
    () =>
      Array(7)
        .fill("Player")
        .map((name, index) => `${name} ${index + 1}`),
    []
  );

  const [isGameReady, setGameReady] = React.useState<boolean>(false);
  const [playerIndex, setPlayerIndex] = React.useState<number>(0);

  const [players, setPlayers] = React.useState<BlackJacker[]>(
    playerNames
      .map(
        (name, index) =>
          ({
            name: name,
            seat: PlayerSeat[index],
            isPlayer: true,
            isPlayerActive: false,
            cards: [],
          } as BlackJacker)
      )
      .concat([dealer])
  );

  const [cardDeck, setCardDeck] = React.useState<CardProp[]>(cards);

  const playerDrawCard = (
    playerIndex: number,
    concealed: boolean,
    delay: number = 500
  ) => {
    setTimeout(() => {
      console.log("draw card");
      setCardDeck((prevCardDeck) => {
        const [firstCard, ...restCards] = prevCardDeck;
        const clonedCard = { ...firstCard };
        setPlayers((prevPlayers) => {
          return prevPlayers.map((player, idx) => {
            const clonedPlayer = { ...player, cards: [...player.cards] };
            if (idx === playerIndex) {
              clonedCard.concealed = concealed;
              clonedPlayer.cards.push(clonedCard);
            }
            return clonedPlayer;
          });
        });
        return restCards;
      });
    }, delay);
  };

  const gameIsReady = () => {
    const dealerPlayer = players.find((player) => !player.isPlayer);
    if (!dealerPlayer) return;
    // ผู้เล่น 7 คน + dealer 1 คน โดยแจกคนละ 2 ใบ = แจก 16 ใบ
    for (let i = 0; i < 16; i++) {
      playerDrawCard(i % 8, i > 14, i * 50);
    }
    setTimeout(() => {
      setGameReady(true);
    }, 16 * 50);
  };

  const handleStartGame = () => {
    setGameReady(false);
    setPlayerIndex(0);
    setPlayers(
      playerNames
        .map(
          (name, index) =>
            ({
              name: name,
              seat: PlayerSeat[index],
              isPlayer: true,
              isPlayerActive: index === 0,
              cards: [],
            } as BlackJacker)
        )
        .concat([dealer])
    );
    setCardDeck(shuffleCards());
    setTimeout(() => {
      gameIsReady();
    }, 250);
  };

  React.useEffect(() => {
    setPlayers((prevPlayer) => {
      return prevPlayer.map((player, idx) => {
        return {
          ...player,
          isPlayerActive: idx === playerIndex,
        };
        // if (idx === playerIndex) {
        //   return {
        //     ...player,
        //     isPlayerActive: true,
        //   };
        // }

        // return {
        //   ...player,
        //   isPlayerActive: false,
        // };
      });
    });
  }, [playerIndex]);

  return (
    <div className="App">
      <Grid container spacing={2} direction="row" sx={{ minHeight: "100vh" }}>
        {Array(12)
          .fill(0)
          .map((_, i) => {
            const player = players.find((player) => player.seat === i);
            return (
              <Grid item xs={4} key={i} border={1}>
                <PlayerHand
                  isReady={isGameReady}
                  onHit={() => {
                    playerDrawCard(playerIndex, false, 50);
                  }}
                  onStand={() => {
                    setPlayerIndex((prev) => prev + 1);
                  }}
                  playerInfo={player}
                />
                {i === DeckSeat ? (
                  <Button variant="contained" onClick={handleStartGame}>
                    Start Game
                  </Button>
                ) : null}
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default App;
