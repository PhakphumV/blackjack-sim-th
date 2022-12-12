import { useMemo, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import {
  calculateBlackJackPoint,
  getCurrentPoint,
  isBlackJack,
} from "../helpers/cards";
import { BlackJacker, CardProp } from "../helpers/interfaces";
import Card from "./cards";

interface PlayerHandProp {
  playerInfo: BlackJacker | undefined;
  playerIndex: number;
  isReady: boolean;
  onHit: (playerIdx: number) => void;
  onStand: (playerIdx: number) => void;
  onDealerGotBlackJack: () => void;
  // onBusted: (playerIdx: number) => void;
}

interface UserPoint {
  currentPoint: number;
  points: number[];
  isBlackJack: boolean;
}

const PlayerHand = ({
  playerInfo,
  isReady,
  playerIndex,
  onHit,
  onStand,
  onDealerGotBlackJack,
}: // onBusted,
PlayerHandProp) => {
  const points = useMemo<UserPoint>(() => {
    if (!playerInfo) {
      return {
        currentPoint: 0,
        points: [],
        isBlackJack: false,
      };
    }
    const points = calculateBlackJackPoint(playerInfo.cards);
    const currentPoint = getCurrentPoint(points);
    return {
      currentPoint: currentPoint,
      points: points,
      isBlackJack: isBlackJack(playerInfo.cards),
    };
  }, [playerInfo]);

  // if (points[0] > 21 && points[1] > 21) {
  //   onStand();
  // }

  useEffect(() => {
    if (!isReady) return;

    if (playerInfo?.isPlayer === false && points.isBlackJack) {
      // TODO: end game
      onDealerGotBlackJack();
      return;
    }

    if (playerInfo?.isPlayerActive === false) return;

    if (playerInfo?.isPlayer === false) {
      if (points.currentPoint < 17) {
        onHit(playerIndex);
      }
    }

    if (points.isBlackJack || points.currentPoint >= 21) {
      onStand(playerIndex);
    }
  }, [
    points,
    isReady,
    playerInfo,
    playerIndex,
    onStand,
    onHit,
    onDealerGotBlackJack,
  ]);

  if (!playerInfo) return null;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item sx={{ textAlign: "center" }}>
        {playerInfo.name}{" "}
        {points.isBlackJack && playerInfo.isPlayer ? "has BLACKJACK!!" : ""}
        {points.currentPoint}
      </Grid>
      <Grid item container direction="row" sx={{ textAlign: "center" }}>
        {playerInfo.cards.map((card) => (
          <Grid item key={card.label + card.suit}>
            <Card
              label={card.label}
              suit={card.suit}
              color={card.color}
              point={card.point}
              concealed={card.concealed}
            />
          </Grid>
        ))}
      </Grid>
      {playerInfo.isPlayerActive &&
      isReady &&
      playerInfo.isPlayer &&
      points.currentPoint < 21 &&
      !points.isBlackJack ? (
        <Grid
          item
          container
          direction="row-reverse"
          spacing={2}
          paddingRight={2}
        >
          <Grid item>
            <Button variant="outlined" onClick={() => onStand(playerIndex)}>
              Stand
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => onHit(playerIndex)}>
              Hit
            </Button>
          </Grid>
          <Grid item>
            <Typography>{points.currentPoint}</Typography>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default PlayerHand;
