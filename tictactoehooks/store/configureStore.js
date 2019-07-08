import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "../reducers";
import { persistStore } from "redux-persist";

export const store = createStore(reducers, applyMiddleware(thunk, logger));
export const persistor = persistStore(store);
