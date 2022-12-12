import shuffle from "lodash/shuffle";

import { CardProp } from "./interfaces";
const HEART = "♥";
const SPADE = "♠";
const CLUB = "♣";
const DIAMOND = "♦";

// สร้างตัวแปร cards จาก CardPro[] เพื่อเก็บข้อมูลของไพ่
export const cards: CardProp[] = [
  { label: "A", suit: HEART, color: "red", point: [1, 11] },
  { label: "2", suit: HEART, color: "red", point: 2 },
  { label: "3", suit: HEART, color: "red", point: 3 },
  { label: "4", suit: HEART, color: "red", point: 4 },
  { label: "5", suit: HEART, color: "red", point: 5 },
  { label: "6", suit: HEART, color: "red", point: 6 },
  { label: "7", suit: HEART, color: "red", point: 7 },
  { label: "8", suit: HEART, color: "red", point: 8 },
  { label: "9", suit: HEART, color: "red", point: 9 },
  { label: "10", suit: HEART, color: "red", point: 10 },
  { label: "J", suit: HEART, color: "red", point: 10 },
  { label: "Q", suit: HEART, color: "red", point: 10 },
  { label: "K", suit: HEART, color: "red", point: 10 },
  { label: "A", suit: SPADE, color: "black", point: [1, 11] },
  { label: "2", suit: SPADE, color: "black", point: 2 },
  { label: "3", suit: SPADE, color: "black", point: 3 },
  { label: "4", suit: SPADE, color: "black", point: 4 },
  { label: "5", suit: SPADE, color: "black", point: 5 },
  { label: "6", suit: SPADE, color: "black", point: 6 },
  { label: "7", suit: SPADE, color: "black", point: 7 },
  { label: "8", suit: SPADE, color: "black", point: 8 },
  { label: "9", suit: SPADE, color: "black", point: 9 },
  { label: "10", suit: SPADE, color: "black", point: 10 },
  { label: "J", suit: SPADE, color: "black", point: 10 },
  { label: "Q", suit: SPADE, color: "black", point: 10 },
  { label: "K", suit: SPADE, color: "black", point: 10 },
  { label: "A", suit: CLUB, color: "black", point: [1, 11] },
  { label: "2", suit: CLUB, color: "black", point: 2 },
  { label: "3", suit: CLUB, color: "black", point: 3 },
  { label: "4", suit: CLUB, color: "black", point: 4 },
  { label: "5", suit: CLUB, color: "black", point: 5 },
  { label: "6", suit: CLUB, color: "black", point: 6 },
  { label: "7", suit: CLUB, color: "black", point: 7 },
  { label: "8", suit: CLUB, color: "black", point: 8 },
  { label: "9", suit: CLUB, color: "black", point: 9 },
  { label: "10", suit: CLUB, color: "black", point: 10 },
  { label: "J", suit: CLUB, color: "black", point: 10 },
  { label: "Q", suit: CLUB, color: "black", point: 10 },
  { label: "K", suit: CLUB, color: "black", point: 10 },
  { label: "A", suit: DIAMOND, color: "red", point: [1, 11] },
  { label: "2", suit: DIAMOND, color: "red", point: 2 },
  { label: "3", suit: DIAMOND, color: "red", point: 3 },
  { label: "4", suit: DIAMOND, color: "red", point: 4 },
  { label: "5", suit: DIAMOND, color: "red", point: 5 },
  { label: "6", suit: DIAMOND, color: "red", point: 6 },
  { label: "7", suit: DIAMOND, color: "red", point: 7 },
  { label: "8", suit: DIAMOND, color: "red", point: 8 },
  { label: "9", suit: DIAMOND, color: "red", point: 9 },
  { label: "10", suit: DIAMOND, color: "red", point: 10 },
  { label: "J", suit: DIAMOND, color: "red", point: 10 },
  { label: "Q", suit: DIAMOND, color: "red", point: 10 },
  { label: "K", suit: DIAMOND, color: "red", point: 10 },
];

export const shuffleCards = () => shuffle(cards);

export const calculateBlackJackPoint = (cards: CardProp[]): number[] => {
  const points = [0, 0];
  cards.forEach((card) => {
    if (Array.isArray(card.point)) {
      points[0] += card.point[0];
      points[1] += card.point[1];
    } else {
      points[0] += card.point;
      points[1] += card.point;
    }
  });

  return points;
};

export const getCurrentPoint = (points: number[]): number => {
  let pointsLowerThan21 = points.filter((point) => point <= 21);
  if (pointsLowerThan21.length === 0) {
    return Math.min(...points);
  }
  return Math.max(...pointsLowerThan21);
};

export const isBlackJack = (cards: CardProp[]): boolean => {
  const points = calculateBlackJackPoint(cards);
  const currentPoint = getCurrentPoint(points);
  return cards.length === 2 && currentPoint === 21;
};
