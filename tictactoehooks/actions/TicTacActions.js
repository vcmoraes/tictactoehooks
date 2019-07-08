export const SET_GAME = "ADD_GAMES_PLAYED";
export const CLEAN_GAME = "CLEAN_GAME";

export const setGame = game => ({
  type: SET_GAME,
  game
});

export const cleanGame = () => ({
  type: CLEAN_GAME
});
