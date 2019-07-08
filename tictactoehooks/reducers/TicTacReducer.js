import { CLEAN_GAME, SET_GAME } from "../actions/TicTacActions";
import { FIRST_PLAYER } from "../hooks/TicTacHooks";

const matrixInitial = () => [new Array(3), new Array(3), new Array(3)];

const gameInitial = () => ({
  currentPlayer: FIRST_PLAYER,
  matrix: matrixInitial(),
  winnerPlayer: "",
  playing: false,
  count: 0
});

const initialState = {
  game: gameInitial()
};

export default function TicTacReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME:
      return { ...state, game: action.game };
    case CLEAN_GAME:
      return {
        ...initialState,
        game: { ...gameInitial(), count: state.game.count }
      };
  }
  return state;
}
