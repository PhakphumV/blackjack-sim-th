import { CardProp } from "../helpers/interfaces";
import Fade from "@mui/material/Fade";

const Card = ({ label, suit, color, concealed }: CardProp) => {
  const backgroundColor = concealed ? "gray" : "white";

  return (
    <Fade
      in={true}
      timeout={1000}
      style={{
        width: 80,
        height: 100,
        backgroundColor: backgroundColor,
        marginRight: 5,
      }}
    >
      <h1 style={{ color: color }}>{concealed ? "" : `${label}${suit}`}</h1>
    </Fade>
  );
};

export default Card;
