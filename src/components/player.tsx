import { Grid, Button } from "@mui/material";
import { BlackJacker, CardProp } from "../helpers/interfaces";
import Card from "./cards";

interface PlayerHandProp {
  playerInfo: BlackJacker | undefined;
  isReady: boolean;
  onHit: () => void;
}

const PlayerHand = ({ playerInfo, isReady, onHit }: PlayerHandProp) => {
  if (!playerInfo) return null;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item sx={{ textAlign: "center" }}>
        {playerInfo.name}
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
      {playerInfo.isPlayerActive && isReady ? (
        <Grid
          item
          container
          direction="row-reverse"
          spacing={2}
          paddingRight={2}
        >
          <Grid item>
            <Button variant="contained" onClick={onHit}>
              Hit
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default PlayerHand;
