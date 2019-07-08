import { createContext } from "react";

const TicTacContext = createContext({
  game: {
    matrix: [new Array(3), new Array(3), new Array(3)],
    winnerPlayer: "",
    playing: false,
    count: 0
  },
  cleanGame: () => {},
  setSelectedItem: () => {}
});

export default TicTacContext;
