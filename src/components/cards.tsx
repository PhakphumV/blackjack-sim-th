import { CardProp } from "../cards";

const Card = ({ label, suit, color, point }: CardProp) => {
  return (
    <div style={{ width: 80, height: 50, backgroundColor: "white" }}>
      <h1 style={{ color: color }}>
        {label}
        {suit}
      </h1>
    </div>
  );
};

export default Card;
