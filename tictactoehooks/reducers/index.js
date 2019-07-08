import { combineReducers } from "redux";
import ticTac from "./TicTacReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const ticTacConfig = {
  key: "ticTac",
  storage: storage
};

const rootReducer = combineReducers({
  ticTac: persistReducer(ticTacConfig, ticTac)
});

export default rootReducer;
