import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/configureStore.js";
import Home from "./containers/Home";
import { PersistGate } from "redux-persist/lib/integration/react";

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
};

export default ReduxApp;
