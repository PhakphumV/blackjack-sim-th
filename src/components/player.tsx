import { Grid } from "@mui/material";
import { BlackJacker, CardProp } from "../helpers/interfaces";
import Card from "./cards";

interface PlayerHandProp {
  hand: CardProp[];
  playerInfo: BlackJacker | undefined;
}

const PlayerHand = ({ hand, playerInfo }: PlayerHandProp) => {
  if (!playerInfo) return null;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item sx={{ textAlign: "center" }}>
        {playerInfo.name}
      </Grid>
      <Grid item container direction="row" sx={{ textAlign: "center" }}>
        {hand.map((card) => (
          <Grid item key={card.label + card.suit}>
            <Card
              label={card.label}
              suit={card.suit}
              color={card.color}
              point={card.point}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default PlayerHand;
