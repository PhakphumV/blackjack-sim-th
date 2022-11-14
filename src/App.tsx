import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { cards } from "./cards";
import Card from "./components/cards";

function App() {
  return (
    <div className="App">
      {cards.map((card, idx) => {
        return (
          <Card
            label={card.label}
            suit={card.suit}
            color={card.color}
            point={card.point}
            key={idx}
          />
        );
      })}
    </div>
  );
}

export default App;
