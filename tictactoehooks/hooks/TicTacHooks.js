import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  setGame,
  cleanGame as cleanGameAction
} from "../actions/TicTacActions";

export const FIRST_PLAYER = "X";
export const SECOND_PLAYER = "O";
export const WITHOUT_WINNER = "=";

const initialPlayer = FIRST_PLAYER;
const MIN_PLAYS_WIN = 5;
const SIZE_TABLE = 9;

export const useTicTac = () => {
  const game = useSelector(state => state.ticTac.game);
  const dispatch = useDispatch();

  const cleanGame = useCallback(() => {
    dispatch(cleanGameAction());
  }, [dispatch]);

  const getWinnerPlayer = useCallback(() => {
    const matrix = game.matrix;

    //diagonal
    if (matrix[0][0] == matrix[1][1] && matrix[0][0] == matrix[2][2]) {
      return matrix[0][0];
    }
    if (matrix[0][2] == matrix[1][1] && matrix[0][2] == matrix[2][0]) {
      return matrix[0][2];
    }

    for (let rowOrColumn = 0; rowOrColumn < 3; rowOrColumn++) {
      //horizontal - row
      if (
        matrix[rowOrColumn][0] == matrix[rowOrColumn][1] &&
        matrix[rowOrColumn][0] == matrix[rowOrColumn][2]
      ) {
        return matrix[rowOrColumn][0];
      }
      //vertical - column
      if (
        matrix[0][rowOrColumn] == matrix[1][rowOrColumn] &&
        matrix[0][rowOrColumn] == matrix[2][rowOrColumn]
      ) {
        return matrix[0][rowOrColumn];
      }
    }
  }, [game.matrix]);

  const verifyWinnerPlayer = useCallback(() => {
    const matrix = game.matrix;
    const countsMoves = _.compact(_.flattenDeep(matrix)).length;

    if (countsMoves < MIN_PLAYS_WIN) {
      return;
    }

    const winnerPlayer = getWinnerPlayer();
    if (winnerPlayer) {
      return winnerPlayer;
    }

    if (countsMoves === SIZE_TABLE) {
      return WITHOUT_WINNER;
    }
  }, [game.matrix, getWinnerPlayer]);

  const toogleCurrentPlayer = useCallback(() => {
    const isFirstPlayer = game.currentPlayer === FIRST_PLAYER;
    return isFirstPlayer ? SECOND_PLAYER : FIRST_PLAYER;
  }, [game.currentPlayer]);

  const setSelectedItem = useCallback(
    ({ row, column }) => {
      const matrix = game.matrix;
      let count = game.count;
      if (matrix[row][column]) {
        return;
      }

      matrix[row][column] = game.currentPlayer;

      const currentPlayer = toogleCurrentPlayer();
      const winnerPlayer = verifyWinnerPlayer();

      dispatch(
        setGame({
          currentPlayer,
          matrix,
          winnerPlayer: winnerPlayer,
          playing: true,
          count: winnerPlayer ? ++count : count
        })
      );
    },
    [
      game.matrix,
      game.count,
      game.currentPlayer,
      toogleCurrentPlayer,
      verifyWinnerPlayer,
      dispatch
    ]
  );

  return {
    game,
    setSelectedItem,
    cleanGame
  };
};
