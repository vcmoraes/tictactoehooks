import React from "react";
import TicTacContext from "../context/TicTacContext";
import { useTicTac } from "../hooks/TicTacHooks";

const TicTacProvider = ({ children }) => (
  <TicTacContext.Provider value={useTicTac()}>
    {children}
  </TicTacContext.Provider>
);

export default TicTacProvider;
