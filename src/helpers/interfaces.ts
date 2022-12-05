export interface CardProp {
  label: string; // "A", "1", "2"...
  suit: string; // "♥", "♠", "♣", "♦"
  color: string; // "red" or "black"
  point: number | number[];
  concealed?: boolean; // true = คว่ำไพ่, false = หงายไพ่
}

export interface BlackJacker {
  name: string;
  seat: number;
  isPlayer: boolean;
  isPlayerActive: boolean;
  cards: CardProp[];
}

export interface SeatProp {}
